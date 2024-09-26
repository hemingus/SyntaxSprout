import { useState, useRef, useContext } from 'react'
import SyntaxTreeNode from './SyntaxTreeNode'
import SyntaxTreeActions from './SyntaxTreeActions'
import SyntaxTreeContext from './SyntaxTreeContext'
import { expectedTree, bigTree } from '../../testcases/TestRoots'
import HtmlToImageButton from '../HtmlToImageButton'
import SyntaxTreeLines from './SyntaxTreeSVG/SyntaxTreeLines'
import ThemeSettings from '../Theme/ThemeSettings'
import { useTheme } from '../Theme/ThemeContext'
import MySyntaxTrees from './MySyntaxTrees'
import TreeSettings from '../Settings/TreeSettings'
import SyntaxTreeGenerator from './SyntaxTreeGenerator'

const SyntaxTreeCanvas : React.FC = () => {
    const {root, setRoot, selectedNodes, setSelectedNodes} = useContext(SyntaxTreeContext)!
    const {activeTheme} = useTheme()
    const [isGenerating, setIsGenerating] = useState(false)
    const [showActions, setShowActions] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const syntaxTreeRef = useRef<HTMLDivElement>(null);

    function handleContextMenuNode(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault()
        setPosition({ x: event.clientX, y: event.clientY });
        setShowActions(true)
    }

    function onCloseActionMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault()
        setShowActions(false)
    }

    const syntaxTree = () => {
        return (
            <>
            <SyntaxTreeActions active={showActions} posX={position.x} posY={position.y} onClose={onCloseActionMenu} />
            <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center flex-col items-center overflow-x-auto relative w-full solid bg-gradient-to-tr from-slate-900 via-gray-950 to-slate-900">
                <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-col">
                        <button 
                            className="cursor-pointer text-xl bg-slate-700 text-white hover:bg-slate-500" 
                            onClick={() => setIsGenerating(true)}>
                                Create new
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
                        <HtmlToImageButton element={syntaxTreeRef.current} imageName={root.meta?.name ? root.meta.name : "(no name)"}/>
                    </div>
                    <ThemeSettings />
                    <TreeSettings />
                </div>
                <MySyntaxTrees />
            </div>
            </div>
            
            {/** The canvas for the syntax tree */}
            <div className="flex justify-center items-start overflow-x-auto relative mb-28">
                <div 
                ref={syntaxTreeRef} 
                onContextMenu={handleContextMenuNode} 
                id="syntax-tree-canvas" 
                className={`flex justify-start flex-col w-fit h-auto overflow-auto p-10 relative origin-top-left ${activeTheme.canvas}`}
                onClick={() => setSelectedNodes([])}>  
                    <SyntaxTreeNode node={root} />  
                    <SyntaxTreeLines />
                </div>
            </div>
            
            

            

            {/* <ul>
                {selectedNodes.map((node, index) => <li key={index} style={{color: "white", listStyle: "none"}}>
                    {`${index+1}: Node name: ${node.label} Node id: ${node.id} - Parent name: ${node.parent!.label} Parent id: ${node.parent!.id}`}
                </li>)}
            </ul> */}
            </>
        )
    }

    const content = () => {
        return isGenerating ? <SyntaxTreeGenerator /> : syntaxTree()
    }

    return (
        <div>
            {content()}
        </div>
    )
}

export default SyntaxTreeCanvas