import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await API.get('/api/notification');
                setNotifications(res.data.notifications);
            } catch { toast.error('Failed to load'); }
            finally { setLoading(false); }
        };
        fetch();
    }, []);

    const markRead = async (id) => {
        try {
            await API.put(`/api/notification/${id}/read`);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        } catch { toast.error('Failed'); }
    };

    const clearAll = async () => {
        try {
            await API.delete('/api/notification');
            setNotifications([]);
            toast.success('Cleared!');
        } catch { toast.error('Failed'); }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Sidebar />
            <div className="ml-64 flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">🔔 Notifications</h1>
                        <p className="text-gray-400 text-sm mt-1">Your recent news alerts</p>
                    </div>
                    {notifications.length > 0 && (
                        <button onClick={clearAll} className="text-sm text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 transition">
                            Clear All
                        </button>
                    )}
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-4xl mb-3">📭</p>
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {notifications.map(n => (
                            <div key={n._id} className={`bg-white rounded-xl border p-4 ${n.read ? 'border-gray-200 opacity-60' : 'border-purple-200'}`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <span className="text-xs text-purple-600 font-medium uppercase">{n.category}</span>
                                        <h3 className="text-sm font-semibold text-gray-800 mt-1">{n.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{n.description}</p>
                                        <div className="flex gap-3 mt-2">
                                            {n.url && <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-500 hover:underline">Read article →</a>}
                                            <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    {!n.read && (
                                        <button onClick={() => markRead(n._id)} className="text-xs text-gray-400 hover:text-purple-600 whitespace-nowrap">
                                            Mark read
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;