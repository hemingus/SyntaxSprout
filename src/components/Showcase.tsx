
interface ShowcaseProps {
    containerStyles?: string
    headerText: string
    imageURL: string
    altText: string
    paragraphText: string
}

export default function Showcase({ containerStyles, headerText, imageURL, altText, paragraphText }: ShowcaseProps) {
    return (
        <div className={`flex flex-col justify-stretch items-center bg-gradient-to-t from-slate-800 to-transparent 
            p-2 text-white text-center rounded-xl ${containerStyles}`}>
            <h2>{headerText}</h2>
            <img className="w-4/5" src={imageURL} alt={altText} />
            <p>{paragraphText}</p>
        </div>
    )
}