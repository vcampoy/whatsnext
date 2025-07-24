import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useTodoStore } from '../store/todoStore'

export default function TodoList() {
  const { todos, reorderTodos, removeTodo } = useTodoStore()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    
    const fromIndex = result.source.index
    const toIndex = result.destination.index
    
    if (fromIndex !== toIndex) {
      reorderTodos(fromIndex, toIndex)
    }
  }

  const handleRemove = (id: string) => {
    removeTodo(id)
  }

  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="max-w-md mx-auto space-y-2"
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between transition-shadow ${
                      snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-800">{todo.text}</span>
                    </div>
                    <button
                      onClick={() => handleRemove(todo.id)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-4"
                      title="Remove task"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
} 