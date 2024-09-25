interface ConfirmationDialogProps {
    message: string
    isVisible: boolean
    onConfirm: () => void
    onCancel: () => void
  }
  
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, isVisible, onConfirm, onCancel }) => {
if (!isVisible) return null; // Don't render the component if it's not visible

return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
    <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <p className="text-lg text-black font-semibold mb-4">{message}</p>
        <div className="flex justify-around">
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onConfirm}
        >
            Confirm
        </button>
        <button
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
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