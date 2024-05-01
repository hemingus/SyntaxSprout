import { nanoid } from 'nanoid'

export interface TreeNodeMethods {
    findNodeById(id: string): TreeNode | undefined
    findAllLeaves(): TreeNode[]
    addChild(newNode: TreeNode): void
    deleteNode(): void
    setLabel(label: string): void
    setChildren(nodes: TreeNode[]): void
    setParent(node: TreeNode): void
    deleteNodeById(id: string): void
    deleteChildren(nodes: TreeNode[]): void
    generateParentFromChildren(nodes: TreeNode[], label: string): void
    clone(): TreeNode
}

export class TreeNode implements TreeNodeMethods {
    id: string
    label: string
    children?: TreeNode[]
    parent?: TreeNode

    constructor(label: string, children?: TreeNode[], parent?: TreeNode) {
        this.id = nanoid()
        this.label = label
        this.children = children
        this.parent = parent
    }

    clone(): TreeNode {
        const nodeClone: TreeNode = Object.create(this)
        return nodeClone
    }

    setChildren(nodes: TreeNode[]) {
        this.children = []; // Initialize children array if undefined
        this.children.length = 0; // Clear existing children
        nodes.forEach((node) => {
            const newChildNode = node.clone()
            newChildNode.parent = this; // Set parent for each child
            this.children!.push(newChildNode); // Add new child
        });
    }

    setParent(node: TreeNode): void {
        this.parent = node
    }

    setLabel(label: string): void {
        this.label = label
    }
        

    findNodeById(id: string): TreeNode | undefined {
        if (this.id === id) {
            return this
        }
    
        if (this.children) {
            for (const child of this.children) {
                const foundNode = child.findNodeById(id)
                if (foundNode) {
                    return foundNode
                }
            }
        }
        return undefined;
    }

    // Method to find all leaf nodes in the tree
    findAllLeaves(): TreeNode[] {
        const leaves: TreeNode[] = [];
        this.traverseAndFindLeaves(this, leaves);
        return leaves;
    }

    private traverseAndFindLeaves(node: TreeNode, leaves: TreeNode[]): void {
        if (!node.children || node.children.length === 0) {
            leaves.push(node); // Add leaf node to the list
            return;
        }

        // Recursively traverse children
        for (const child of node.children) {
            this.traverseAndFindLeaves(child, leaves);
        }
    }
    
    addChild(newNode: TreeNode): void {
        if (!this.children) {
            this.children = []
        }
        this.children.push(newNode)
    }

    insertChild(newNode: TreeNode, index: number): void {
        if (!this.children) {
            this.children = []
            this.children.push(newNode)
        }
        else {
            this.children.splice(index, 0, newNode)
        }
    }

    deleteNode(): void {
        if (this.parent) {
            // Find the index of this node within its parent's children array
            const index = this.parent.children?.indexOf(this)
            if (index !== undefined && index !== null && index !== -1) {
                // Remove this node from its parent's children
                this.parent.children?.splice(index, 1)
                // Promote children to the level of the parent, preserving order
                if (this.children) {
                    // Insert the children at the same index as the deleted node
                    this.parent.children?.splice(index, 0, ...this.children)
                    // Update parent reference for promoted children
                    for (const child of this.children) {
                        child.parent = this.parent
                    }
                }
            }
        }
    }
    
    deleteNodeById(id: string): void {
        this.findNodeById(id)?.deleteNode()
    }

    deleteChildren(nodes: TreeNode[]): void {
        nodes.forEach(node => this.deleteNodeById(node.id))
    }

    generateParentFromChildren(nodes: TreeNode[], label: string): void {
        
        const oldParent = nodes[0].parent!
        const newParent = new TreeNode(label, nodes, oldParent)
        const newParentIndex = oldParent.children!.indexOf(nodes[0])
        if (newParentIndex) console.log(newParentIndex.toString)
        console.log(`newParentIndex`)
        nodes.forEach(node => {
            node.parent = newParent
        })
        console.log(`old parent: ${oldParent.label}`)
        console.log(`new parent: ${newParent.label}`)
        newParent.setChildren(nodes)
        
        oldParent.children = oldParent.children!.filter(child => !nodes.includes(child))
        oldParent.insertChild(newParent, newParentIndex)
    }
}






