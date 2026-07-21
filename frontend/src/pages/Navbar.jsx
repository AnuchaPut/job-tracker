import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../api/userApi";

export default function Navbar() {

    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function loadCurrentUser() {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }

        if (token) {
            loadCurrentUser();
        }
    }, [token]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    if (!token) return null;

    const initial = user?.username?.charAt(0).toUpperCase() || "?";

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                <Link
                    to="/dashboard"
                    className="text-xl font-bold text-blue-600"
                >
                    Job Tracker
                </Link>

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-gray-50"
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                            {initial}
                        </div>
                        {user && (
                            <div className="text-left hidden sm:block">
                                <p className="font-medium text-sm leading-tight">{user.username}</p>
                                <p className="text-xs text-gray-500 leading-tight">{user.role}</p>
                            </div>
                        )}
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                            {user && (
                                <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                                    <p className="font-medium text-sm">{user.username}</p>
                                    <p className="text-xs text-gray-500">{user.role}</p>
                                </div>
                            )}
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}