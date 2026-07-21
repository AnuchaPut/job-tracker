import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../auth/authService';
import { login } from '../auth/authService';
import toast from 'react-hot-toast';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!EMAIL_REGEX.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (!PASSWORD_REGEX.test(password)) {
            toast.error('Password must be at least 8 characters and include uppercase, lowercase, and a number');
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        setSubmitting(true);
        try {
            await register(username, email, password);
            const response = await login(email, password);
            const token = response.data.token;
            localStorage.setItem('token', token);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error('An account with this email already exists');
            } else if (!err.response) {
                toast.error('Cannot reach server. Please try again.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
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
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    >
                        {submitting ? 'Creating account…' : 'Register'}
                    </button>
                    <p>Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login here</a></p>
                </div>
                
            </form>
        </div>
    )
}