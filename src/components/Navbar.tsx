import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex justify-center items-center top-0 left-0 w-full gap-5 bg-gradient-to-b from-transparent to-black">
        <Link className="no-underline" 
            to="/dashboard">
            <h2 className="p-2 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black 
            hover:from-green-600 hover:to-black">
                Dashboard
            </h2>
        </Link>

        <Link className="no-underline" 
            to="/tutorial">
            <h2 className="p-2 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black
            hover:from-green-600 hover:to-black">
                Tutorial
            </h2>
        </Link>

        <Link className="no-underline" 
            to="/about">
            <h2 className="p-2 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black
            hover:from-green-600 hover:to-black">
                About
            </h2>
        </Link>
    </nav>
    )
}

export default Navbar