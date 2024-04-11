import { nanoid } from 'nanoid'

export interface TreeNodeMethods {
    findNodeById(id: string): TreeNode | undefined
    findAllLeaves(): TreeNode[]
    addChild(newNode: TreeNode): void
    deleteNode(): void
    setChildren(nodes: TreeNode[]): void
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
        this.children = this.children || []; // Initialize children array if undefined
        this.children.length = 0; // Clear existing children
        nodes.forEach((node) => {
            node.parent = this; // Set parent for each child
            this.children!.push(node); // Add new child
        });
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
        const newParent = new TreeNode(label)
        newParent.setChildren(nodes)
        this.deleteChildren(nodes)
        this.addChild(newParent)
    }
}






