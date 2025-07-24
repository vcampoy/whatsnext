import TodoInput from './TodoInput'
import TodoList from './TodoList'

interface ContainerProps {
  children?: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <TodoInput />
      <TodoList />
      {children}
    </main>
  )
} 