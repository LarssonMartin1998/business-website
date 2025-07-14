import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const Counter = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => (
    <div className="flex items-center gap-3">
        <button
            onClick={() => onChange(value - 1)}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
        >
            -
        </button>
        <span className="text-xl font-mono min-w-[2ch] text-center">{value}</span>
        <button
            onClick={() => onChange(value + 1)}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
        >
            +
        </button>
    </div>
)

const App = () => {
    const [count, setCount] = useState(0)

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Counter App
                </h1>
                <Counter value={count} onChange={setCount} />
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
