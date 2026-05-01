import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // clear error while typing
        setErrors({ ...errors, [e.target.name]: '' });
    };

    // 🔥 VALIDATION FUNCTION
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

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

            {/* LEFT SIDE */}
            <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-5 h-5 bg-purple-600 rounded-sm"></div>
                    <span className="font-semibold text-gray-800">CB's News Alert App</span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-400 mb-8">We will give news alert to the users</p>

                {/* 🔥 FORM */}
                <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* NAME */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    {/* BUTTON */}
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
                    <Link to="/login" className="text-purple-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/2 bg-purple-300 flex items-center justify-center">
                <div className="bg-purple-200 rounded-3xl px-16 py-12 text-center">
                    <p className="text-white font-semibold text-xl mb-6">
                        Login to get News Alerts from us
                    </p>
                    <Link to="/login">
                        <button className="bg-white text-purple-600 px-8 py-2 rounded-full font-medium">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;