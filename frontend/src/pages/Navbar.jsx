import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/userApi";

export default function Navbar() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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


    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }


    if (!token) return null;


    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                <Link 
                    to="/dashboard"
                    className="text-xl font-bold text-blue-600"
                >
                    Job Tracker
                </Link>


                <div className="flex items-center gap-4">

                    {user && (
                        <div>
                            <p className="font-medium">
                                {user.username}
                            </p>

                            <p className="text-sm text-gray-500">
                                {user.role}
                            </p>
                        </div>
                    )}


                    <button
                        onClick={logout}
                        className="
                            bg-red-500 
                            hover:bg-red-600 
                            text-white 
                            px-4 
                            py-2 
                            rounded-md
                        "
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}