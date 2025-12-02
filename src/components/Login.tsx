import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder action - just log for now
    console.log('Email submitted:', email)
    // Clear the input after submission
    setEmail('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="bg-gray-800 text-gray-100 border-b border-gray-700 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-blue-400">
            What's Next - Login
          </h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
              Sign In with Email
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-400 border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} What's Next. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
