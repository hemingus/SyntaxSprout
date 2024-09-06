import { useState, useEffect, useRef, useContext } from 'react'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import SyntaxTreeActions from '../SyntaxTreeActions/SyntaxTreeActions'
import SyntaxTreeContext from '../SyntaxTreeContext'
import './SyntaxTreeCanvas.css'
import { expectedTree, bigTree } from '../../testcases/TestRoots'
import HtmlToImageButton from '../HtmlToImageButton/HtmlToImageButton'
import SyntaxTreeLines from '../SyntaxTreeLines/SyntaxTreeLines'
import ThemeSettings from '../Theme/ThemeSettings'
import { useTheme } from '../Theme/ThemeContext'
import MySyntaxTrees from '../MySyntaxTrees'

const SyntaxTreeCanvas : React.FC = () => {
    const {root, setRoot, selectedNodes} = useContext(SyntaxTreeContext)!
    const {theme} = useTheme()
    const [confirmed, setConfirmed] = useState(true)
    const [showActions, setShowActions] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const syntaxTreeRef = useRef<HTMLDivElement>(null);

    function handleContextMenuNode(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault()
        setPosition({ x: event.clientX, y: event.clientY });
        setShowActions(true)
        console.log(showActions)
    }

    function onCloseActionMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault()
        setShowActions(false)
    }

    const syntaxTree = () => {
        return (
            <>
            <SyntaxTreeActions active={showActions} posX={position.x} posY={position.y} onClose={onCloseActionMenu} />
            <div className="canvas-container w-fit left-1/2 -translate-x-1/2 solid bg-gradient-to-b from-green-950 to-slate-900 p-8">
                <div className="flex">
                    <div className="flex flex-col">
                        <button 
                            className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500" 
                            onClick={() => setConfirmed(false)}>
                                Change sentence
                        </button>
                        <button 
                            className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                            onClick={() => setRoot(expectedTree)}>
                                Test expected tree
                        </button>
                        <button 
                            className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500"
                            onClick={() => setRoot(bigTree)}>
                                Test big tree
                        </button>
                        <HtmlToImageButton element={syntaxTreeRef.current} />
                    </div>
                    <ThemeSettings />
                    <MySyntaxTrees />
                </div>
            </div>
            
            
            {/** The canvas for the syntax tree */}
            <div className="flex justify-center items-start overflow-x-auto relative">
                <div ref={syntaxTreeRef} onContextMenu={handleContextMenuNode} id="syntax-tree-canvas" className={`canvas ${theme.canvas}`}>  
                    <SyntaxTreeNode node={root} /> 
                    <SyntaxTreeLines />
                </div>
            </div>
            

            

            <ul>
                {selectedNodes.map((node, index) => <li key={index} style={{color: "white", listStyle: "none"}}>
                    {`${index+1}: Node name: ${node.label} Node id: ${node.id} - Parent name: ${node.parent!.label} Parent id: ${node.parent!.id}`}
                </li>)}
            </ul>
            </>
        )
    }

    const content = () => {
        if (confirmed) {
            return (
                <>
                    {syntaxTree()}    
                </>
                )
        }
        return <SyntaxTreePage />
    }

    return (
        <div>
            {content()}
        </div>
    )
}

export default SyntaxTreeCanvas