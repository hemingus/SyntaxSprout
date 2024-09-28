import { useState, useRef, useContext } from 'react'
import SyntaxTreeNode from './SyntaxTreeNode'
import SyntaxTreeActions from './SyntaxTreeActions'
import SyntaxTreeContext from './SyntaxTreeContext'
import SyntaxTreeLines from './SyntaxTreeSVG/SyntaxTreeLines'
import { useTheme } from './Theme/ThemeContext'


const SyntaxTreeCanvas : React.FC = () => {
    const {root, setSelectedNodes, syntaxTreeRef} = useContext(SyntaxTreeContext)!
    const {activeTheme} = useTheme()
    const [showActions, setShowActions] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    
    function handleContextMenuNode(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault()
        setPosition({ x: event.clientX, y: event.clientY });
        setShowActions(true)
    }

    function onCloseActionMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault()
        setShowActions(false)
    }

    return (
        <>         
        <SyntaxTreeActions active={showActions} posX={position.x} posY={position.y} onClose={onCloseActionMenu} />
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
        </> ) 
}

export default SyntaxTreeCanvas