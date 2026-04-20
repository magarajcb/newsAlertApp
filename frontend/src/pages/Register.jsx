import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword)
            return toast.error('Passwords do not match!');
        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password);
            toast.success('Account created!');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            <Toaster position="top-right" />
            {/* Left - Form */}
            <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-5 h-5 bg-purple-600 rounded-sm"></div>
                    <span className="font-semibold text-gray-800">CB's News Alert App</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-400 mb-8">We will give news alert to the users</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {[
                        { label: 'Full Name', name: 'name', type: 'text' },
                        { label: 'Email Address', name: 'email', type: 'email' },
                        { label: 'Password', name: 'password', type: 'password' },
                        { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
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
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-6 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 font-medium hover:underline">Login</Link>
                </p>
            </div>
            {/* Right - Purple Panel */}
            <div className="w-1/2 bg-purple-300 flex items-center justify-center">
                <div className="bg-purple-200 rounded-3xl px-16 py-12 text-center">
                    <p className="text-white font-semibold text-xl mb-6">Login to get News Alerts from us</p>
                    <Link to="/login">
                        <button className="bg-white text-purple-600 px-8 py-2 rounded-full font-medium hover:bg-purple-50 transition">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;