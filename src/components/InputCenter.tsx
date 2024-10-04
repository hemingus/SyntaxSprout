import { useState, useEffect, useRef } from 'react'

interface InputCenterProps {
    label: string
    placeholder: string
    isVisible: boolean
    onConfirm: (text: string) => void
    onCancel: () => void
  }
  
const InputCenter: React.FC<InputCenterProps> = ({ label, placeholder, isVisible, onConfirm, onCancel }) => {
    if (!isVisible) return null

    const inputRef = useRef<HTMLInputElement>(null)
    const [newNodeText, setNewNodeText] = useState("")

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onConfirm(newNodeText)
            onCancel()
        } else if (event.key === 'Escape') {
            onCancel()
        }
    }

    return (
        <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center gap-2.5 z-50 text-white text-4xl bg-black/50"
            onClick={() => onCancel()}>
            <label>{label}</label>
            <input className="w-auto max-w-[80vw] bg-black text-blue-300 text-4xl"
                autoComplete="off"
                spellCheck="false"
                placeholder={placeholder}
                ref={inputRef}
                value={newNodeText}
                onChange={(e) => setNewNodeText(e.currentTarget.value)}
                onKeyDown={handleInputKeyDown}
            />
        </div>
    )

}

export default InputCenter