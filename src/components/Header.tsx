import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-gray-800 text-gray-100 border-b border-gray-700 shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-400">
            What's Next
          </h1>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  )
} 