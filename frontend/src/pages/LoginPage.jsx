import { useState } from 'react';
import { login } from '../auth/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{
                e.preventDefault();
            const response = await login(email, password); 
            const token = response.data.token;
            localStorage.setItem('token', token);
            toast.success('Logged in successfully');
            navigate('/');
        } catch (err) {
            toast.error("Invalid email or password")
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit}>
                
                <div className="flex flex-col gap-4 background-white p-8 rounded-lg shadow-md w-96 justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <input type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                    <p>Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700">Register here</a></p>
                </div>
                
            </form>
        </div>
    )
}