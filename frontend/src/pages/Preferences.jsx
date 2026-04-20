import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = ['technology', 'sports', 'politics', 'business', 'health', 'entertainment', 'science'];
const FREQUENCIES = ['immediate', 'hourly', 'daily'];

const Preferences = () => {
    const [prefs, setPrefs] = useState({ categories: [], frequency: 'daily', emailNotifications: true });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await API.get('/preferences');
                setPrefs(res.data.preference);
            } catch { toast.error('Failed to load preferences'); }
        };
        fetch();
    }, []);

    const toggleCategory = (cat) => {
        setPrefs(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await API.put('/preferences', prefs);
            toast.success('Preferences saved!');
        } catch { toast.error('Failed to save'); }
        finally { setLoading(false); }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Sidebar />
            <div className="ml-64 flex-1 p-8 max-w-3xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">⚙️ Preferences</h1>
                <p className="text-gray-400 mb-8">Customize your news alerts</p>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                    <h2 className="font-semibold text-gray-700 mb-4">News Categories</h2>
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
                                    prefs.categories?.includes(cat)
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                    <h2 className="font-semibold text-gray-700 mb-4">Alert Frequency</h2>
                    <div className="flex gap-3">
                        {FREQUENCIES.map(freq => (
                            <button
                                key={freq}
                                onClick={() => setPrefs({ ...prefs, frequency: freq })}
                                className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition ${
                                    prefs.frequency === freq
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {freq === 'immediate' ? '⚡ Immediate' : freq === 'hourly' ? '🕐 Hourly' : '📅 Daily'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-gray-700">Email Notifications</h2>
                            <p className="text-sm text-gray-400">Receive news alerts via email</p>
                        </div>
                        <button
                            onClick={() => setPrefs({ ...prefs, emailNotifications: !prefs.emailNotifications })}
                            className={`w-12 h-6 rounded-full transition relative ${prefs.emailNotifications ? 'bg-purple-600' : 'bg-gray-300'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${prefs.emailNotifications ? 'left-6' : 'left-0.5'}`}></div>
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition disabled:opacity-60"
                >
                    {loading ? 'Saving...' : 'Save Preferences'}
                </button>
            </div>
        </div>
    );
};

export default Preferences;