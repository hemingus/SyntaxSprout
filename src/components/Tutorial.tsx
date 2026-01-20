import { actionDetailsData } from "../data/actiondetails"
import ActionDetails from "./ActionDetails"

const Tutorial = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 text-white mb-48">
            <h1 className="w-full text-2xl xs:text-3xl text-center bg-blue-950 m-4 p-1">
                Tutorial
            </h1>
            <div className="grid w-7/8 p-2 lg:w-4/5 lg:p-4 xl:w-3/4 xl:p-6 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700">
                <p className="px-8 text-xl"> 
                    <span className="text-emerald-500">🎇Create new🎇</span>to create the beginnings of a new syntax tree.<br/>
                    To save time, SyntaxSprout lets you create the foundation of the syntax tree with a few simple inputs.<br/>
                    <br/>
                    <span className="text-amber-400">1. Name </span>Give the syntax tree a name to help you keep track.<br/>
                    <span className="text-amber-400">2. Root </span>Set label of your root (Example: S for Sentence or CP for compound).<br/>
                    <span className="text-amber-400">3. Sentence </span>Type the words of analysis (sentence/compound).<br/>
                    <br/>
                    You should see the beginnings of a syntax tree, and the rest of the syntax tree you will build using actions (explained below).<br/>
                    <span className="text-emerald-500">📸 Download as image ⤓ </span>
                    when you are done.<br/>
                    Your syntax tree is downloaded as a PNG file.
                </p>
            </div>
            <h2 className="m-0">Actions explained</h2>
            {actionDetailsData.map(action => {
                return <ActionDetails key={action.action} {...action} />
            })}
        </div>
    )
}

export default Tutorial