import { ActionDetailsProps } from "../data/actiondetails"

export default function ActionDetails({ iconURL, imageURL, action, description, hotkey }: ActionDetailsProps) {
    return (
        <details className="grid w-full xl:w-3/4 sm:rounded-xl cursor-pointer
        bg-gradient-to-b from-slate-900 to-slate-700 
        hover:bg-gradient-to-b hover:from-blue-950 hover:to-slate-900">
            <summary>
                <div className="flex flex-row justify-start items-center gap-10 mx-10 mb-2">
                    <img className="h-16 rounded-lg shadow-[0_0_20px_5px_white]" src={iconURL}/>
                    <h2>{action} {hotkey && <span className="text-sky-400 whitespace-nowrap">{hotkey}</span>}</h2>          
                </div>
            </summary>
            <div className="grid w-full lg:grid-cols-2 sm:rounded-xl bg-gradient-to-b from-slate-900 to-slate-700 appearGrow">
                <p className="px-8 text-xl whitespace-pre-line">
                    {description}                       
                </p>
                <img className="px-8 w-5/6 max-w-[500px]" src={imageURL}/>
            </div>
        </details>
    )
}