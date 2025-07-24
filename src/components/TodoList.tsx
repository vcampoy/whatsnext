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
import { useTodoStore } from '../store/todoStore'
import TodoItem from './TodoItem'

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
      <div className="text-center text-gray-400 py-8">
        <p>No games yet. Add your first game above!</p>
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
                   <TodoItem
                     key={todo.id}
                     id={todo.id}
                     index={index}
                     text={todo.text}
                     metacriticScore={todo.metacriticScore}
                     howLongToBeatHours={todo.howLongToBeatHours}
                     onRemove={handleRemove}
                   />
                 ))}
               </div>
      </SortableContext>
    </DndContext>
  )
} 