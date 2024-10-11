interface ColorSelectCenterProps {
    label: string
    isVisible: boolean
    onConfirm: (color: string) => void
    onCancel: () => void
  }
  
const ColorSelectCenter: React.FC<ColorSelectCenterProps> = ({ label, isVisible, onConfirm, onCancel }) => {
    if (!isVisible) return null

    const colors = ["red", "green", "blue", "orange", "purple", "magenta", "orangered", "lime", "deepskyblue", "olive", "springgreen", "darkviolet"]

    return (
        <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center z-50 text-white text-2xl bg-black/50"
            onClick={() => onCancel()}>
            <div className="flex flex-col justify-center items-center p-4 bg-slate-600 border-solid border-gray-400 rounded-2xl gap-2.5 m-8">
                <label>{label}</label>
                <div className="flex flex-row flex-wrap justify-center items-center gap-2.5">
                
                {colors.map(color => <span 
                    className="w-10 h-10 rounded-lg border-solid border-black cursor-pointer hover:border-white hover:scale-110"
                    style={{background: color}}
                    onClick={() => onConfirm(color)}/>)}
                </div>
            </div>
        </div>
    )
}

export default ColorSelectCenter