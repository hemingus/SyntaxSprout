import { nanoid } from 'nanoid'

export interface TreeNodeMethods {
    findNodeById(id: string): TreeNode | undefined
    addNode(newNode: TreeNode): void
    deleteChild(node: TreeNode): void
    clone(): TreeNode
}

export class TreeNode implements TreeNodeMethods {
    id: string;
    label: string;
    children?: TreeNode[];
    parent?: TreeNode;

    constructor(label: string, children?: TreeNode[], parent?: TreeNode) {
        this.id = nanoid()
        this.label = label;
        this.children = children;
        this.parent = parent;
    }

    clone(): TreeNode {
        const nodeClone: TreeNode = Object.create(this)
        return nodeClone
    }

    findNodeById(id: string): TreeNode | undefined {
        if (this.id === id) {
            return this;
        }
    
        if (this.children) {
            for (const child of this.children) {
                const foundNode = child.findNodeById(id);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
        return undefined;
    }
    
    addNode(newNode: TreeNode): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(newNode);
    }
    
    deleteChild(node: TreeNode): void {
        this.children = this.children?.filter(n => n.id !== node.id)
    }
}






