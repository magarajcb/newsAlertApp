import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiHome,
  HiMagnifyingGlass,
  HiBookmark,
  HiCog,
  HiArrowRightOnRectangle,
  HiBell
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success('Logged out!');
        navigate('/login');
    };

    const navItems = [
        { to: '/dashboard', icon: <HiHome size={20} />, label: 'Home' },
{ to: '/explore', icon: <HiMagnifyingGlass size={20} />, label: 'Explore' },,
        { to: '/notifications', icon: <HiBell size={20} />, label: 'Notifications' },
        { to: '/preferences', icon: <HiCog size={20} />, label: 'Settings' },
    ];

    return (
        <div className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col px-4 py-6 fixed left-0 top-0">
           
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-6 h-6 bg-purple-600 rounded-md"></div>
                <span className="font-bold text-gray-800 text-lg">NewsAlert</span>
            </div>

         
            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                                isActive
                                    ? 'bg-purple-50 text-purple-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`
                        }
                    >
                        {icon}
                        {label}
                    </NavLink>
                ))}

              
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition mt-2"
                >
                    <HiArrowRightOnRectangle size={20} />
                    Logout
                </button>
            </nav>

          
            <div className="bg-purple-50 rounded-2xl p-4 mt-4">
                <p className="font-semibold text-gray-800 text-sm mb-1">Subscribe Premium</p>
                <p className="text-xs text-gray-500 mb-3">Currently not available.</p>
                <button  onClick={() => toast("Premium subscription is currently not available")}
                className="w-full bg-purple-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default Sidebar;