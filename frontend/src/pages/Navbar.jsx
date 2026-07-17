import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    if (!token) return null;

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link 
                    to="/" 
                    className="text-xl font-bold text-blue-600 hover:text-blue-700"
                >
                    Job Tracker
                </Link>


                {/* Right side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={logout}
                        className="
                            bg-red-500 
                            hover:bg-red-600 
                            text-white 
                            px-4 
                            py-2 
                            rounded-md 
                            text-sm 
                            font-medium
                            transition
                        "
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}