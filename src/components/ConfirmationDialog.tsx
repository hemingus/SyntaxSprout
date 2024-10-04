interface ConfirmationDialogProps {
    message: string
    isVisible: boolean
    onConfirm: () => void
    onCancel: () => void
  }
  
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, isVisible, onConfirm, onCancel }) => {
    if (!isVisible) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 cursor-auto"
        onClick={(e) => {e.stopPropagation(); onCancel();}}>
            <div className="bg-slate-700 p-6 rounded-md shadow-lg text-center">
                <p className="text-2xl text-white font-semibold mb-8">{message}</p>
                <div className="flex justify-around">
                    <button
                        className="cursor-pointer px-4 py-2 font-semibold bg-green-700 text-white rounded hover:bg-green-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="cursor-pointer px-4 py-2 font-semibold  bg-gray-600 text-white rounded hover:bg-gray-500"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog;