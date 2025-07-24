import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'

export default function TodoInput() {
  const [inputText, setInputText] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      addTodo(inputText)
      setInputText('')
    }
  }

  const handleAddClick = () => {
    if (inputText.trim()) {
      addTodo(inputText)
      setInputText('')
    }
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  )
} 