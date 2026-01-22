import { actionDetailsData } from "../data/actiondetails"
import ActionDetails from "../components/ActionDetails"

const TutorialPage = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 text-white mb-48">
            <h1 className="w-full text-2xl xs:text-3xl text-center bg-blue-950 m-4 p-1">
                Tutorial
            </h1>
            <h2 className="m-0">Create a syntax tree</h2>
            <div className="max-w-[1200px] grid justify-center items-center w-full xs:w-7/8 p-2 sm:w-3/4 lg:w-4/5 lg:p-4 xl:w-3/4 xl:p-6 
            bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 sm:rounded-xl mb-4">
                <div className="px-2 text-xl p-4 rounded-xl"> 

                        <div className="grid lg:grid-cols-2 items-center gap-4 px-4">
                            <p className="rounded-xl flex-1">
                                Press <span className="text-emerald-400">Create new</span> to create the beginnings of a new syntax tree.<br/><br/>
                                To save time, SyntaxSprout lets you create the foundation of the syntax tree with a few simple inputs.<br/>
                            <br/>

                                <span className="text-amber-400">1. Name </span> <br/> Give the syntax tree a name <br/> to help you keep track.<br/><br/>
                                <span className="text-amber-400">2. Root </span> <br/>Set label of your root. <br/> (Example: S for Sentence or CP for compound)<br/><br/>
                                <span className="text-amber-400">3. Sentence </span> <br/>Type the words of analysis. <br/> (sentence/compound)
                            </p>
                            
                            <div className="flex justify-center">
                                <img
                                    src="../assets/gifs/startwithasentence.gif"
                                    alt="Gif that demonstrate how to create a new syntax tree"
                                    className="flex-1 rounded-lg w-full max-w-[500px]"
                                />
                            </div>
                        </div>
                        <br/>
                    <p className="p-4">
                        You should see the beginnings of a syntax tree. <br/> The rest of the syntax tree you will build using actions (explained below).<br/><br/>
                        Press<span className="text-emerald-400"> Download (PNG) </span>
                        when you are done.
                        Your syntax tree is downloaded as an image (PNG) file.
                    </p>
                </div>


                

            </div>
            <h2 className="m-0">Actions explained</h2>
            {actionDetailsData.map(action => {
                return <ActionDetails key={action.action} {...action} />
            })}
        </div>
    )
}

export default TutorialPage