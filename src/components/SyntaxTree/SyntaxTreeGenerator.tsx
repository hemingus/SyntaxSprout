import { useState, useEffect, useRef, useContext } from 'react'
import { TreeNode } from './TreeNode'
import SyntaxTreeContext from "./SyntaxTreeContext"

interface SyntaxTreeGeneratorProps {
    isVisible: boolean
    onCancel: () => void
}

const SyntaxTreeGenerator = ({ isVisible, onCancel }:SyntaxTreeGeneratorProps) => {
    const [treeName, setTreeName] = useState<string>("")
    const [rootLabel, setRootLabel] = useState<string>("")
    const [sentence, setSentence] = useState<string>("")
    const {root, setRoot, savedTrees, setSavedTrees} = useContext(SyntaxTreeContext)!

    const inputTreeNameRef = useRef<HTMLInputElement>(null)
    const inputRootLabelRef = useRef<HTMLInputElement>(null)
    const inputSentenceRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputTreeNameRef.current) {
          inputTreeNameRef.current.focus();
        }
      }, []);

useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onCancel();
        }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
}, [onCancel]);

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            onCancel()
        }

        if (event.key === "Enter") {
            switch (document.activeElement) {
                case inputTreeNameRef.current:
                    inputRootLabelRef.current!.focus();
                    break;
                case inputRootLabelRef.current:
                    inputSentenceRef.current!.focus();
                    break;
                case inputSentenceRef.current:
                    generateSyntaxTree()
            }
        }
    }

    function generateSyntaxTree() {
        const newRoot = new TreeNode(rootLabel)
        const words = sentence.split(" ")
        const leaves: TreeNode[] = []
        words.forEach(word => {const leaf = new TreeNode(word, undefined, root); leaves.push(leaf)})
        newRoot.setChildren(leaves)
        newRoot.setMeta({name: treeName})
        setRoot(newRoot)
        setSavedTrees([...savedTrees, newRoot])
        onCancel()
    }

    const sentenceGenerator = () => {
        if (!isVisible) return null
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-start z-50 bg-black/50">
                <h1 className="text-center text-white bg-black rounded-full w-fit p-2 shadow-[0_0_50px_1px_white]">New Tree</h1>
                <div className="flex flex-col justify-center items-center p-5 w-fit relative rounded-xl
                lg:w-1/2 md:w-3/4 bg-gradient-to-tr from-green-700 via-emerald-900 to-green-700
                border-solid border-4 border-slate-700">
                    <div className="w-full m-2 flex flex-col justify-center items-center gap-4">
                        <label className="text-xl text-slate-300 font-bold">Tree Name: </label>
                        <h3 className="m-0 w-full p-1 text-yellow-400 bg-gray-700 text-2xl text-center">{treeName}</h3>
                        <label className="text-xl text-slate-300 font-bold">Root Label: </label>
                        <h3 className="m-0 w-full p-1 text-emerald-400 bg-gray-700 text-2xl text-center">{rootLabel}</h3>
                        <label className="text-xl text-slate-300 font-bold">Sentence: </label>
                        <h3 className="m-0 w-full p-1 text-lime-400 bg-gray-700 text-2xl text-center">{sentence}</h3>
                    </div>
                    <div className="w-full m-2 flex flex-col gap-4">
                        <input className="w-full font-sans text-center text-2xl text-white bg-black"
                            ref={inputTreeNameRef}
                            autoComplete="off"
                            spellCheck="false"
                            placeholder="Give your tree a name..."
                            onChange={(e) => setTreeName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        
                        <input className="w-full font-sans text-center text-2xl text-white bg-black"
                            ref={inputRootLabelRef}
                            autoComplete="off"
                            spellCheck="false"
                            placeholder="Label the root of your tree..."
                            onChange={(e) => setRootLabel(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    
                        <input className="w-full font-sans text-center text-2xl text-white bg-black"
                            ref={inputSentenceRef}
                            autoComplete="off"
                            spellCheck="false"
                            placeholder="The sentence you want to analyze here..."
                            onKeyDown={handleKeyDown} 
                            id="sentence-input" 
                            onChange={(e) => setSentence(e.target.value)}  
                        />
                    </div>
                    <button className="mt-4 p-1 text-xl text-gray-300 bg-slate-800 cursor-pointer 
                    hover:text-white hover:bg-slate-700 hover:shadow-[0_0_20px_1px_white]"
                        onClick={() => {generateSyntaxTree(); onCancel}}>
                        Generate Syntax Tree
                    </button>
                    <button className="mt-8 text-xl text-gray-400 bg-slate-800 cursor-pointer 
                    hover:text-gray-300 hover:bg-slate-700"
                        onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    return sentenceGenerator()
}

export default SyntaxTreeGenerator