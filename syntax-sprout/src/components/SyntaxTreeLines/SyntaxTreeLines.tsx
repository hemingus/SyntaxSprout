import { useState, useLayoutEffect, useContext } from 'react'
import SyntaxTreeContext from '../SyntaxTreeContext'
import { TreeNode } from '../TreeNode'
import { useTheme } from '../Theme/ThemeContext'

const SyntaxTreeLines = () => {
    const {activeTheme} = useTheme()
    const {root} = useContext(SyntaxTreeContext)!
    const [lines, setLines] = useState<JSX.Element[]>([])

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
           reRenderLines()
        });
        const syntaxTreeCanvas = document.getElementById("syntax-tree-canvas");
        if (syntaxTreeCanvas) {
            resizeObserver.observe(syntaxTreeCanvas);
        }
        syntaxTreeCanvas!.addEventListener('scroll', reRenderLines)

        window.addEventListener('resize', reRenderLines)
        window.addEventListener('scroll', reRenderLines)
        reRenderLines()
        return () => {
            window.removeEventListener('resize', reRenderLines)
            window.removeEventListener('scroll', reRenderLines)
            syntaxTreeCanvas?.removeEventListener('scroll', reRenderLines)
            resizeObserver.disconnect()}
                        
    }, [root, activeTheme])

    const reRenderLines = () => {
        const linesToRender = renderTreeLines(root, null)
        setLines(linesToRender!) 
    }

    function renderTreeLines(node: TreeNode, parentNodeRect: DOMRect | null) {
        const newLines: JSX.Element[] = []
        if (!node.children) {
            return newLines
        }
        const canvas = document.getElementById("syntax-tree-canvas")!
        const canvasRect: DOMRect = canvas?.getBoundingClientRect()!
        const parentRect = document.getElementById(node.id)?.getBoundingClientRect()!
        const parentCenterX = parentRect.left + parentRect.width/2 + canvas.scrollLeft - canvas.offsetLeft 
        const parentBottomY = parentRect.top + parentRect.height + canvas.scrollTop - canvasRect.top
        if (parentNodeRect === null) {
            return renderTreeLines(node, parentRect)
        }      
        node.children.forEach((child: TreeNode) => {
            const childRect = document.getElementById(child.id)?.getBoundingClientRect()!
            const childCenterX = childRect.left + childRect.width / 2 + canvas.scrollLeft - canvasRect.left
            const childTopY = childRect.top + canvas.scrollTop - canvasRect.top
            let stroke = activeTheme.lines
            newLines.push(
                <line
                    key={child.id}
                    x1={parentCenterX}
                    y1={parentBottomY}
                    x2={childCenterX}
                    y2={childTopY}
                    stroke={stroke} 
                    strokeWidth="3"
                    strokeOpacity="1">
                </line>
                )
            newLines.push(...renderTreeLines(child, parentRect))
        });
        return newLines
    }

    return (
        <svg className="tree-lines" preserveAspectRatio="xMidYMid meet">
            {lines}
        </svg>  
    ) 
}

export default SyntaxTreeLines