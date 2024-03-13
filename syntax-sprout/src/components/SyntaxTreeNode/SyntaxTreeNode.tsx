import './SyntaxTreeNode.css'

export type TreeNode = { 
    label: string,
    children?: TreeNode[],
    parent?: TreeNode
}

const SyntaxTreeNode: React.FC<TreeNode> = (nodeData) => {

    const returnChildren = () => {
        const childrenToReturn = nodeData.children!
        return (
            <div className="nodeBlock-container">
                {childrenToReturn.map((child, index) => (
                    <SyntaxTreeNode key={index+child.label} {...child} />
                ))}
            </div>
        )
    }

    if (nodeData.children) {
        return (
            <>
                <p className="nodeBlock">{nodeData.label}</p>
                {returnChildren()}
            </>
        ) 
        
    }

    return (
            <p className="nodeBlock">{nodeData.label}</p>
    )
}

export default SyntaxTreeNode