import Tooltip from "../utils/Tooltip"

const Tutorial = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-10 text-white mb-48">
            <h1 className="w-full text-center bg-blue-950">Tutorial</h1>
            <div className="grid w-full xl:w-3/4 text-center rounded-xl bg-gradient-to-b from-slate-900 to-slate-700">
                <div className="grid w-full rounded-xl bg-gradient-to-b from-slate-900 to-slate-700">
                    <p className="px-8 text-xl"> 
                        <span className="text-emerald-500">🎇Create new🎇</span>to create the beginnings of a new syntax tree.<br/>
                        To save time, SyntaxSprout lets you create the foundation of the syntax tree with a few simple inputs.<br/>
                        <span className="text-amber-400">1. Name </span>Give the syntax tree a name to help you keep track.<br/>
                        
                        <span className="text-amber-400">2. Root </span>Set label of your root (Example: S for Sentence or CP for compound).<br/>
                        <span className="text-amber-400">3. Sentence </span>Type the words of analysis (sentence/compound).<br/>
                        
                        You should see the beginnings of a syntax tree, and the rest of the syntax tree you will build using actions (explained below).<br/>
                        
                        <span className="text-emerald-500">📸 Download as image ⤓ </span>
                        when you are done.<br/>
                        Your syntax tree is downloaded as a PNG file.
                    </p>
                </div>
            </div>
            <h2 className="m-0">Actions explained</h2>
            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_generateParent.png"/>
                        <h2>Generate new parent <span className="text-sky-400 whitespace-nowrap">(alt + w)</span></h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Generate a new parent node from selected nodes. (building upwards) <br/>
                        If more than one selected node are next to eachother and also share parent, <br/>
                        they will be handled as a group. <br/>
                        Type the label of the new node(s).
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_generateParent.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_addChild.png"/>
                        <h2>Add new child <span className="text-sky-400 whitespace-nowrap">(alt + a)</span></h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Add new child node to selected nodes. (building downwards) <br/>
                        Type the label of the new child node(s). <br/>
                        The new node will appear last (far right) if the selected node already had children.
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_addChild.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_insertNode.png"/>
                        <h2>Insert new node <span className="text-sky-400 whitespace-nowrap">(alt + a)</span></h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Insert new node at selected nodes. (building horizontally) <br/>
                        Type the label of the new node(s). <br/>
                        The new node takes the place of the selected node which shifts to the right.                       
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_insertSibling.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_deleteNode.png"/>
                        <h2>Delete node <span className="text-sky-400 whitespace-nowrap">(alt + x)</span></h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Deletes the selected node(s). <br/>
                        If you delete a node that has children, <br/>
                        they get assigned the parent of the deleted node(s).                   
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_deleteNode.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_editNode.png"/>
                        <h2>Edit node <span className="text-sky-400 whitespace-nowrap">(alt + q)</span></h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Edit the selected node(s). <br/>
                        Type the new label of the node(s). <br/>
                        Selected node(s) changes to the input label.                
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_editNode.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_mergeLines.png"/>
                        <h2>Merge / unmerge children</h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Turns branches from selected node(s) into a triangle across all of their children. <br/>
                        If a selected node already has its branches merged, <br/>
                        it will revert back to one branch for each child node.         
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_mergeLines.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_putArrow.png"/>
                        <h2>Add Arrow</h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Must select at least 2 nodes. <br/>
                        The first selected node becomes the source, and any other selected node becomes target of an arrow originating from the source.        
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_putArrow.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_removeArrow.png"/>
                        <h2>Remove Arrow</h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Removes any arrows originating from selected node(s).         
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_removeArrow.gif"/>
                </div>
            </details>

            <details className="grid w-full lg:grid-cols-2 xl:w-3/4  rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 cursor-pointer 
                hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
                <summary>
                    <Tooltip text="expand/collapse">
                    <div className="flex flex-row justify-start items-center gap-10 mx-10">
                        <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src="/assets/action_pickTextColor.png"/>
                        <h2>Set text color</h2>          
                    </div>
                    </Tooltip>
                </summary>
                <div className="grid w-full lg:grid-cols-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                    <p className="px-8 text-xl"> 
                        Sets the text color of the selected node(s) to the color picked.         
                    </p>
                    <img className="px-8 w-5/6 max-w-[500px]" src="/assets/action_setTextColor.gif"/>
                </div>
            </details>
        </div>
    )
}

export default Tutorial