import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { TreeNode } from '../TreeNode'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import SyntaxTreeContext from '../SyntaxTreeContext/SyntaxTreeContext'
import './SyntaxTreeCanvas.css'


const SyntaxTreeCanvas : React.FC = () => {
    const {root, setRoot} = useContext(SyntaxTreeContext)!
    const [confirmed, setConfirmed] = useState(true)
    const [lines, setLines] = useState<JSX.Element[]>([])

    var and4 = new TreeNode("we_are_the_words_we_are_the_children")
    var and3 = new TreeNode("we_are_the_words_we_are_the_children", [and4])
    var and2 = new TreeNode("we_are_the_words_we_are_the_children", [and3])
    var and1 = new TreeNode("we_are_the_words_we_are_the_children", [and2])
    
    var c1_gc1 = new TreeNode("we_are_the_words_we_are_the_children")
    var c1_gc2 = new TreeNode("we_are_the_words_we_are_the_children")
    var c1_gc3 = new TreeNode("we_are_the_words_we_are_the_children")
        
    var c2_gc1 = new TreeNode("we_are_the_words_we_are_the_children")  
    var c2_gc2 = new TreeNode("we_are_the_words_we_are_the_children", [and1])
    var c2_gc3 = new TreeNode("we_are_the_words_we_are_the_children")

    var c3_gc1 = new TreeNode("we_are_the_words_we_are_the_children")
    var c3_gc2 = new TreeNode("we_are_the_words_we_are_the_children")
    var c3_gc3 = new TreeNode("we_are_the_words_we_are_the_children")

    var child1 = new TreeNode("the_eldest_son_child1", [c1_gc1])
    var child2 = new TreeNode("the_middle_son_child2", [c2_gc1, c2_gc2, c2_gc3])
    var child3 = new TreeNode("the_youngest_son_child3", [c3_gc1, c3_gc2, c3_gc3])
        
    const testRoot = new TreeNode("testRoot", [child1, c1_gc2, c1_gc3, child2, child3])

    var word1 = new TreeNode("YouTube")
    var word2 = new TreeNode("shows")
    var word3 = new TreeNode("that")
    var word4 = new TreeNode("the")
    var word5 = new TreeNode("cat")
    var word6 = new TreeNode("plays")
    var word7 = new TreeNode("piano")
    
    var N1 = new TreeNode("N", [word1])
    var V1 = new TreeNode("V", [word2])
    var Comp1 = new TreeNode("Comp", [word3])
    var Det1 = new TreeNode("Det", [word4])
    var N2 = new TreeNode("N", [word5])
    var V2 = new TreeNode("V", [word6])
    var N3 = new TreeNode("N", [word7])
    
    var NP1 = new TreeNode("NP", [N1])
    var NP2 = new TreeNode("NP", [Det1, N2])
    var NP3 = new TreeNode("NP", [N3])
    var VP1 = new TreeNode("V", [V2, NP3])
    var S1 = new TreeNode("S", [NP2, VP1])
    var S_1 = new TreeNode("S'", [Comp1, S1])
    var VP2 = new TreeNode("VP", [V1, S_1])
    
    const testRoot2 = new TreeNode("S", [NP1, VP2])
        
    function assignParents(node: TreeNode) {
        if (node.children) {
            node.children.forEach(child => 
                {child.parent = node
                if (child.children) {
                    assignParents(child)
                }})
        }
    }

    const reRenderLines = () => {
        const linesToRender = renderTreeLines(root, null)
        setLines(linesToRender!) 
    }

    useEffect(() => {
        assignParents(testRoot)
        assignParents(testRoot2)
    })

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
           reRenderLines()
        });

        // Observe the syntax tree container
        const syntaxTreeContainer = document.getElementById("syntax-tree-container");

        if (syntaxTreeContainer) {
            resizeObserver.observe(syntaxTreeContainer);
        }

        syntaxTreeContainer!.addEventListener('scroll', reRenderLines)

        window.addEventListener('resize', reRenderLines)
        window.addEventListener('scroll', reRenderLines)
        reRenderLines()
        return () => {
            window.removeEventListener('resize', reRenderLines)
            window.removeEventListener('scroll', reRenderLines)
            syntaxTreeContainer?.removeEventListener('scroll', reRenderLines)
            resizeObserver.disconnect()}
                        
    }, [root])

    function renderTreeLines(node: TreeNode, parentNodeRect: DOMRect | null) {
        const newLines: JSX.Element[] = []

        if (!node.children) {
            return newLines
        }

        const parentRect = document.getElementById(node.id)?.getBoundingClientRect()!;
        const parentCenterX = parentRect.left + parentRect.width/2 + window.scrollX;
        const parentBottomY = parentRect.top + parentRect.height + window.scrollY;

        if (parentNodeRect === null) {
            return renderTreeLines(node, parentRect)
        }
        
        node.children.forEach((child: TreeNode) => {
            const childRect = document.getElementById(child.id)?.getBoundingClientRect()!;
            const childCenterX = childRect.left + childRect.width / 2 + window.scrollX;
            const childTopY = childRect.top + window.scrollY;

            let stroke = "white"
            if (!child.children) {
                stroke = "yellowgreen"
            } else {
                stroke = "skyblue"
            }
            
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

    const syntaxTree = () => {
        console.log(root.children)
        return (
            <>
            <button onClick={() => setRoot(testRoot2)}>Test small tree</button>
            <button onClick={() => setRoot(testRoot)}>Test big tree</button>
            <div id="syntax-tree-container" className="canvas-container">
                <SyntaxTreeNode nodeData={root} /> 
                <svg className="tree-lines" preserveAspectRatio="xMidYMid meet">
                    {lines}
                </svg>      
            </div>
            </>
        )
    }

    const content = () => {
        if (confirmed) {
            return (
                <>
                    {syntaxTree()}
                    <button onClick={() => setConfirmed(false)}>Change sentence</button>
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