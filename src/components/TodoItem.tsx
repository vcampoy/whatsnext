import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TodoItemProps {
  id: string
  index: number
  text: string
  metacriticScore: number
  howLongToBeatHours: number
  onRemove: (id: string) => void
}

export default function TodoItem({ id, index, text, metacriticScore, howLongToBeatHours, onRemove }: TodoItemProps) {
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

  const getMetacriticColor = (score: number) => {
    if (score >= 75) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 bg-gray-800 rounded-lg border border-gray-700 transition-all cursor-move ${
        isDragging ? 'shadow-2xl shadow-blue-500/20 border-blue-500/30' : 'hover:shadow-lg hover:shadow-gray-900/50 hover:border-gray-600'
      }`}
    >
      {/* Header row with item number, title, and delete button */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-1">
            {index + 1}
          </span>
          <h3 className="text-lg font-semibold text-gray-100 flex-1 leading-tight">
            {text}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove(id)
          }}
          className="text-red-400 hover:text-red-300 transition-colors ml-4 flex-shrink-0"
          title="Remove task"
        >
          ✕
        </button>
      </div>
      
      {/* Details row with scores and buttons */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          {/* Metacritic Score */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Metacritic:</span>
            <span className={`px-2 py-1 rounded text-white text-xs font-medium ${getMetacriticColor(metacriticScore)}`}>
              {metacriticScore}
            </span>
          </div>
          
          {/* How Long to Beat Hours */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">How long to beat:</span>
            <span className="text-gray-200 font-medium">
              {howLongToBeatHours}h
            </span>
          </div>
        </div>
        
        {/* G2A Buy Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            // G2A functionality to be implemented
          }}
          disabled
          className="px-3 py-1.5 bg-gray-700 text-gray-500 border border-gray-600 rounded text-xs font-medium cursor-not-allowed"
          title="Buy on G2A (Coming Soon)"
        >
          Buy on G2A
        </button>
      </div>
    </div>
  )
} 