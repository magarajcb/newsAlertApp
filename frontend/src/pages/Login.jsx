import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
   const { login, user } = useAuth();
    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    if (user) {
    return <Navigate to="/dashboard" />;
}

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            <Toaster position="top-right" />
      
            <div className="w-1/2 bg-purple-300 flex items-center justify-center">
                <div className="bg-purple-200 rounded-3xl px-16 py-12 text-center">
                    <p className="text-white font-semibold text-xl mb-6">New here? Create an account!</p>
                    <Link to="/register">
                        <button className="bg-white text-purple-600 px-8 py-2 rounded-full font-medium hover:bg-purple-50 transition">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
       
            <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-5 h-5 bg-purple-600 rounded-sm"></div>
                    <span className="font-semibold text-gray-800">CB's News Alert App</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-400 mb-8">Login to your account to get news alerts</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                        { label: 'Email Address', name: 'email', type: 'email' },
                        { label: 'Password', name: 'password', type: 'password' },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="text-sm text-gray-600 mb-1 block">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-60 mt-2"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-6 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-purple-600 font-medium hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;