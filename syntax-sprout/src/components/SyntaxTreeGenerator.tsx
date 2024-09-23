import SyntaxTreeCanvas from "./SyntaxTree/SyntaxTreeCanvas/SyntaxTreeCanvas"
import { useState, useEffect, useRef, useContext } from 'react'
import { TreeNode } from './TreeNode'
import SyntaxTreeContext from "./SyntaxTree/SyntaxTreeContext"
import { ThemeProvider } from "./Theme/ThemeContext"
import { SettingsProvider } from "./Settings/SettingsContex"
import { SyntaxTreeProvider } from "./SyntaxTree/SyntaxTreeContext"

const SyntaxTreeGenerator = () => {
    const [treeName, setTreeName] = useState<string>("")
    const [rootLabel, setRootLabel] = useState<string>("")
    const [sentence, setSentence] = useState<string>("")
    const [leafNodes, setLeafNodes] = useState<TreeNode[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const {root, setRoot, savedTrees, setSavedTrees} = useContext(SyntaxTreeContext)!

    const inputTreeNameRef = useRef<HTMLInputElement>(null)
    const inputRootLabelRef = useRef<HTMLInputElement>(null)
    const inputSentenceRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputTreeNameRef.current) {
          inputTreeNameRef.current.focus();
        }
      }, []);

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            switch (document.activeElement) {
                case inputTreeNameRef.current:
                    inputRootLabelRef.current!.focus();
                    break;
                case inputRootLabelRef.current:
                    inputSentenceRef.current!.focus();
                    break;
                case inputSentenceRef.current:
                    handleConfirmSentence()
                    generateSyntaxTree()
            }
        }
    }

    const sentenceGenerator = () => {
        return (
            <div className="my-[4svh] mx-[4svw] h-[90svh] flex flex-col justify-center items-center
            bg-[url('./assets/vines_waterfall_01.png')] bg-center bg-no-repeat">
                <div className="flex flex-col justify-center items-center p-5 w-fit relative 
                lg:w-1/2 md:w-3/4 bg-gradient-to-tr from-slate-900 via-emerald-900 to-slate-900
                border-solid border-8 border-slate-700">
                    
                    <label className="text-xl text-slate-300 font-bold">Tree Name: </label>
                    <h3 className="m-0 w-full p-1 text-yellow-400 bg-gray-700 text-2xl text-center">{treeName}</h3>
                    <label className="text-xl text-slate-300 font-bold">Root Label: </label>
                    <h3 className="m-0 w-full p-1 text-emerald-500 bg-gray-700 text-2xl text-center">{rootLabel}</h3>
                    <label className="text-xl text-slate-300 font-bold">Sentence: </label>
                    <h3 className="m-0 w-full p-1 text-lime-500 bg-gray-700 text-2xl text-center">{sentence}</h3>

                
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
                        onKeyDown={(event) => {if (event.key === 'Enter') handleConfirmSentence()}} 
                        id="sentence-input" 
                        onChange={(e) => setSentence(e.target.value)}  
                    />
                   
                    <div className="flex flex-row gap-5">
                        <button className="text-xl text-gray-300 bg-slate-800 cursor-pointer hover:text-lime-400" 
                        onClick={() => {setIsGenerating(false)}}>Cancel (Esc)</button>
                        <button className="text-xl text-gray-300 bg-slate-800 cursor-pointer hover:text-lime-400"
                        onClick={() => {handleConfirmSentence; generateSyntaxTree()}}>Generate Syntax Tree (Enter)</button>
                    </div>
                </div>
            </div>
        )
    }

    const generateSyntaxTree = () => {
        const newRoot = new TreeNode(rootLabel)
        newRoot.setChildren(leafNodes)
        newRoot.setMeta({name: treeName})
        setRoot(newRoot)
        setSavedTrees([...savedTrees, newRoot])
        setIsGenerating(false)
    }


    const handleConfirmSentence = () => {
        const words = sentence.split(" ")
        const leaves: TreeNode[] = []
        words.forEach(word => {const leaf = new TreeNode(word, undefined, root); leaves.push(leaf)})
        setLeafNodes(leaves)
    }
    
    if (!isGenerating) {
        return (
            <SyntaxTreeProvider>
                <SettingsProvider>
                    <ThemeProvider>
                        <SyntaxTreeCanvas/>
                    </ThemeProvider>
                </SettingsProvider>
            </SyntaxTreeProvider>
        )
    }
    return sentenceGenerator()

}

export default SyntaxTreeGenerator