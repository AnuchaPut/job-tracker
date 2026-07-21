import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../auth/authService';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        await register(username, email, password);
        const token = await login(email, password);
        localStorage.setItem('token', token);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit}>
                
                <div className="flex flex-col gap-4 background-white p-8 rounded-lg shadow-md w-96 justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
                    <input type="text" name="username" placeholder="username" required onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </button>
                    <p>Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login here</a></p>
                </div>
                
            </form>
        </div>
    )
}