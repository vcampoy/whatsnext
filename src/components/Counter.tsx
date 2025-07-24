import { useCounterStore } from '../store/counterStore'

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Counter</h2>
        
        <div className="text-6xl font-bold text-blue-600 mb-8">
          {count}
        </div>
        
        <div className="space-x-4">
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            -
          </button>
          
          <button
            onClick={reset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Reset
          </button>
          
          <button
            onClick={increment}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
} 