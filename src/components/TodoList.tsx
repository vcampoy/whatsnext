import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTodoStore } from '../store/todoStore'

interface SortableItemProps {
  id: string
  index: number
  text: string
  onRemove: (id: string) => void
}

function SortableItem({ id, index, text, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between transition-shadow cursor-move ${
        isDragging ? 'shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
          {index + 1}
        </span>
        <span className="text-gray-800">{text}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove(id)
        }}
        className="text-red-500 hover:text-red-700 transition-colors ml-4"
        title="Remove task"
      >
        ✕
      </button>
    </div>
  )
}

export default function TodoList() {
  const { todos, reorderTodos, removeTodo } = useTodoStore()
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex(todo => todo.id === active.id)
      const newIndex = todos.findIndex(todo => todo.id === over.id)
      
      reorderTodos(oldIndex, newIndex)
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map(todo => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="max-w-md mx-auto space-y-2">
          {todos.map((todo, index) => (
            <SortableItem
              key={todo.id}
              id={todo.id}
              index={index}
              text={todo.text}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
} 