import { useState, useLayoutEffect, useContext } from 'react'
import SyntaxTreeContext from '../SyntaxTreeContext'
import { TreeNode } from '../TreeNode'
import { useTheme } from '../Theme/ThemeContext'
import { useTreeSetting } from '../Settings/SettingsContex'
import CurvedArrow from './CurvedArrow'

const SyntaxTreeLines = () => {
    const {activeTheme} = useTheme()
    const {setting} = useTreeSetting()
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
                        
    }, [root, activeTheme, setting])

    const reRenderLines = () => {
        setTimeout(() => {
            const linesToRender = renderTreeLines(root, null)
            setLines(linesToRender)
        }, 0)
    }

    function renderTreeLines(node: TreeNode, parentNodeRect: DOMRect | null) {
        const newLines: JSX.Element[] = []
        let stroke = activeTheme.lines

        const canvas = document.getElementById("syntax-tree-canvas")!
        const canvasRect: DOMRect = canvas?.getBoundingClientRect()!
        const parentRect = document.getElementById(node.id)?.getBoundingClientRect()!
        const parentCenterX = parentRect.left + parentRect.width/2 + canvas.scrollLeft - canvas.offsetLeft 
        const parentBottomY = parentRect.top + parentRect.height + canvas.scrollTop - canvasRect.top

        if (parentNodeRect === null) {
            return renderTreeLines(node, parentRect)
        }

        if (node.meta?.arrows!) {
            node.meta.arrows.forEach((targetId) => {
                const targetRect = document.getElementById(targetId)?.getBoundingClientRect()!
                const targetCenterX = targetRect.left + targetRect.width/2 + canvas.scrollLeft - canvas.offsetLeft
                const targetBottomY = targetRect.top + targetRect.height + canvas.scrollTop - canvasRect.top
                const controlX = (parentCenterX + targetCenterX) / 2; // Example control point calculation
                const controlY = canvasRect.height; // Adjust this for the curvature height
    
                newLines.push(
                    <CurvedArrow
                        key={`${node.id + targetId}`}
                        startX={parentCenterX}
                        startY={parentBottomY}
                        endX={targetCenterX}
                        endY={targetBottomY}
                        controlX={controlX}
                        controlY={controlY}
                        stroke={stroke}
                    />
                );
            })
        }

        if (!node.children) {
            return newLines
        }

        if (node.meta?.merged) {
            const n = node.children.length
            const firstChild = node.children[0]
            const lastChild = node.children[n-1]
            const childRectStart = document.getElementById(firstChild.id)?.getBoundingClientRect()!
            const childRectEnd = document.getElementById(lastChild.id)?.getBoundingClientRect()!
            const childStartX = childRectStart.left + canvas.scrollLeft - canvasRect.left
            const childEndX = childRectEnd.left + childRectEnd.width + canvas.scrollLeft - canvasRect.left
            const childRectY = childRectStart.top + canvas.scrollTop - canvasRect.top

            // newLines.push(
            //     <line
            //         key={firstChild.id}
            //         x1={parentCenterX}
            //         y1={parentBottomY}
            //         x2={childStartX}
            //         y2={childRectY}
            //         stroke={stroke} 
            //         strokeWidth="3"
            //         strokeOpacity="1">
            //     </line>)
            // newLines.push(
            //     <line
            //         key={lastChild.id}
            //         x1={parentCenterX}
            //         y1={parentBottomY}
            //         x2={childEndX}
            //         y2={childRectY}
            //         stroke={stroke} 
            //         strokeWidth="3"
            //         strokeOpacity="1">
            //     </line>)
            // newLines.push(
            //     <line
            //         key={firstChild.id + lastChild.id}
            //         x1={childStartX}
            //         y1={childRectY}
            //         x2={childEndX}
            //         y2={childRectY}
            //         stroke={stroke} 
            //         strokeWidth="2"
            //         strokeOpacity="1">
            //     </line>)
            const points = `${parentCenterX},${parentBottomY},${childStartX},${childRectY},${childEndX},${childRectY}`
            newLines.push(
            <polygon key={`polygon-${node.id}`} points={points} fill="transparent" stroke={stroke} stroke-width="2.5"/>)
                
            node.children.forEach((child: TreeNode) => {
                newLines.push(...(renderTreeLines(child, parentRect) || [])); // Ensures an array
            });

        } else {
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
                strokeWidth="2.5"
                strokeOpacity="1">
            </line>
            )
        newLines.push(...renderTreeLines(child, parentRect))
        }); }

        return newLines
    }

    return (
        <svg className="tree-lines" preserveAspectRatio="xMidYMid meet">
            {lines}
        </svg>  
    ) 
}

export default SyntaxTreeLines