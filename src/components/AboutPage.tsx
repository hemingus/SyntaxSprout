const AboutPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-white">
            <h1 className="w-full text-2xl xs:text-3xl text-center bg-blue-950 m-4 p-1">
                About
            </h1>
            <div className="grid w-7/8 p-4 lg:w-4/5 xl:w-3/4 rounded-xl bg-gradient-to-b from-slate-900 to-slate-700">
                <h2 className="text-amber-400">What is SyntaxSprout ?</h2>
                <p>SyntaxSprout is a web application and a tool that gives you an easy way to construct syntax trees.<br/>
                It is mainly developed for linguistic syntax trees, but feel free to explore other uses as well.</p>
                <h2 className="text-amber-400">Who made SyntaxSprout ?</h2>
                <p>SyntaxSprout is created by Heming Hanevik, a data technology graduate from the University of Bergen.</p>
                <h2 className="text-amber-400">Where are my syntax trees stored ?</h2>
                <p>When you create a new syntax tree, it is stored in your browser's local storage. <br/> 
                So you will not find trees that are created on a different device or a different browser.<br/>
                It also means that you will not find any previous created trees if you clear your browser's local storage.</p>
            </div>
        </div>
    )
}

export default AboutPage