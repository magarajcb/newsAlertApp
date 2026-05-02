import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Preferences from './pages/Preferences';
import Notifications from './pages/Notifications';
import ChannelPage from "./pages/ChannelPage";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    {/* Public Routes */}
                    <Route path="/" element={<Navigate to="/register" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
                    <Route path="/channel/:name" element={<ProtectedRoute><ChannelPage /></ProtectedRoute>} />
                    <Route path="/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
                    <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

                    {/* Fallback Route (IMPORTANT) */}
                    <Route path="*" element={<Navigate to="/login" />} />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;