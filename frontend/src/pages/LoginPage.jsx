export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form action="/login" method="POST">
                
                <div className="flex flex-col gap-4 background-white p-8 rounded-lg shadow-md w-96 justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </div>
                
            </form>
        </div>
    )
}