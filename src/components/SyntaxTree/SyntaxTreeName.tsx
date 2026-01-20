import { useContext, useState } from "react"
import SyntaxTreeContext from './SyntaxTreeContext'
import Tooltip from "../../utils/Tooltip"
import InputCenter from "../InputCenter"

export default function SyntaxTreeName() {
    const { root, setRoot } = useContext(SyntaxTreeContext)!
    const [showNewNameInput, setShowNewNameInput] = useState(false)

    function changeTreeName(name: string) {
        const newRoot = root.deepCopy()
        const newMeta = {...newRoot.meta, name}
        newRoot.setMeta(newMeta)
        setRoot(newRoot)
    }

    return (
        <div className="w-full min-w-0 flex justify-center items-center mr-auto">
            <h1 className="min-w-0 text-[clamp(1.4rem,2.6vw,1.8rem)] text-center text-yellow-400 break-words p-0 mb-2 mt-0 px-2">
                {root.meta?.name || "(no name)"}
            </h1>                
            <Tooltip text="edit name">
                <button className="mr-[2vw] text-lg hover:border-slate-400 cursor-pointer bg-gradient-to-br from-black to-slate-700 rounded-xl"
                    onClick={() => setShowNewNameInput(true)}>
                    ✏️
                </button>
            </Tooltip>
        {showNewNameInput && 
            <InputCenter 
                label="New name:" 
                placeholder="Name of the tree..."
                isVisible={true} 
                onConfirm={changeTreeName} 
                onCancel={() => setShowNewNameInput(false)}/>}
        </div>
    )
}
            
