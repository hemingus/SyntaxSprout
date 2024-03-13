import { useState, useEffect } from 'react'
import { TreeNode } from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreeNode from '../SyntaxTreeNode/SyntaxTreeNode'
import SyntaxTreePage from '../SyntaxTreePage/SyntaxTreePage'
import './SyntaxTreeCanvas.css'

interface SyntaxTreeCanvasProps {
    root: TreeNode
}

const SyntaxTreeCanvas : React.FC<SyntaxTreeCanvasProps> = ({root}) => {
    const [confirmed, setConfirmed] = useState(true)
    
    // const wordBlocks = () => {
    //     return (
    //         <div>
    //             <ul className="wordBlock-container">
    //                 {words.map((word, index) => (
    //                     <li className="wordBlock" key={index}>{word}</li>
    //                 ))}
    //             </ul>
    //             <button onClick={() => {setConfirmed(false)}}>Reset Sentence</button>
    //         </div>
    //     )
    // }

    const syntaxTree = () => {
        console.log(root.children)
        return (
            <SyntaxTreeNode {...root} />
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