import Counter from './components/Counter'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            React + Tailwind + Zustand
          </h1>
          <p className="text-gray-600">
            A simple counter app demonstrating the tech stack
          </p>
        </header>
        <main className="flex justify-center">
          <Counter />
        </main>
      </div>
    </div>
  )
}

export default App 