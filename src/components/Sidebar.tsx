import { NavLink, useNavigate } from 'react-router';
import { getAuthToken } from "../util/auth"
import { logout } from '../util/http';
import PostsIcon from "./Icons/PostsIcon"
import DashboardIcon from './Icons/DashboardIcon';
import NewPostIcon from './Icons/NewPostIcon';
import LoginIcon from './Icons/LoginIcon';
import LogoutIcon from "./Icons/LogoutIcon";
import { useDispatch } from 'react-redux';
import { authActions } from "../store/auth-slice";

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = getAuthToken();

    const handleLogout = () => {
        logout();
        dispatch(authActions.logout());
        navigate("/");
    }

    return (
        <aside className="bg-blue-950 w-2/12 flex flex-col justify-between h-[calc(100vh-4rem)] py-5 sticky top-16">
            <div className="flex flex-col gap-5">
                <NavLink to="/blog/posts" className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${isActive ? "bg-indigo-900 rounded-l-lg font-bold" : undefined}
                `}>
                    <PostsIcon /> <span className="max-[57rem]:hidden">Posts</span>
                </NavLink>

                <NavLink to="/blog/new-post" className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${isActive ? "bg-indigo-900 rounded-l-lg font-bold" : undefined}
                `}>
                    <NewPostIcon /> <span className="max-[57rem]:hidden">New Post</span>
                </NavLink>

                <NavLink to="/blog/dashboard" className={({ isActive }) => `
                    py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline ${isActive ? "bg-indigo-900 rounded-l-lg font-bold" : undefined}
                `}>
                    <DashboardIcon /> <span className="max-[57rem]:hidden">Dashboard</span>
                </NavLink>
            </div>


            {!isAuthenticated && <NavLink to="/" className="py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline">
                <LoginIcon /> <span className="max-[57rem]:hidden">Login/Signup</span>
            </NavLink>}

            {isAuthenticated && <button className="py-1.5 px-5 flex items-center gap-2 max-[57rem]:justify-center hover:underline hover:cursor-pointer" type="button" onClick={handleLogout}>
                <LogoutIcon /> <span className="max-[57rem]:hidden">Logout</span>
            </button>}
        </aside>
    )
}

export default Sidebar;