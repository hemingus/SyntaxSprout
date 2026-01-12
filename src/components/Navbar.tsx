import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex flex-col xs:flex-row justify-center items-center top-0 left-0 w-full gap-0 xs:gap-5 bg-gradient-to-b from-transparent to-black">
        <Link className="no-underline w-3/4 xs:w-auto text-center"
            to="/dashboard">
            <h2 className="p-2 m-0 xs:m-3 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black 
            hover:from-green-600 hover:to-black">
                Dashboard
            </h2>
        </Link>

        <Link style={{padding: "0", margin: "0"}} className="no-underline w-3/4 xs:w-auto text-center" 
            to="/tutorial">
            <h2 className="p-2 m-0 xs:m-3 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black
            hover:from-green-600 hover:to-black">
                Tutorial
            </h2>
        </Link>

        <Link className="no-underline w-3/4 xs:w-auto text-center" 
            to="/about">
            <h2 className="p-2 m-0 xs:m-3 rounded-xl text-lime-500 bg-gradient-to-b from-green-800 to-black border-solid border-black
            hover:from-green-600 hover:to-black">
                About
            </h2>
        </Link>
    </nav>
    )
}

export default Navbar