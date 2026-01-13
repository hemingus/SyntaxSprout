import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex justify-center items-center top-0 left-0 w-full gap-5 p-1 bg-gradient-to-b from-transparent to-black">
        <Link
            to="/dashboard"
            className="
                no-underline
                text-center
                text-md
                xs:text-2xl
                font-bold
                p-2
                m-1 xs:m-3
                rounded-xl
                text-lime-500
                bg-gradient-to-b from-green-800 to-black
                border-solid border-[1px] border-black
                hover:from-green-600 hover:to-black
            "
        >
            Dashboard
        </Link>

        <Link
            to="/tutorial"
            className="
                no-underline
                text-center
                text-md
                xs:text-2xl
                font-bold
                p-2
                m-1 xs:m-3
                rounded-xl
                text-lime-500
                bg-gradient-to-b from-green-800 to-black
                border-solid border-[1px] border-black
                hover:from-green-600 hover:to-black
            "
        >
            Tutorial
        </Link>

        <Link
            to="/about"
            className="
                no-underline
                text-center
                text-md
                xs:text-2xl
                font-bold
                p-2
                m-1 xs:m-3
                rounded-xl
                text-lime-500
                bg-gradient-to-b from-green-800 to-black
                border-solid border-[1px] border-black
                hover:from-green-600 hover:to-black
            "
        >
            About
        </Link>
    </nav>
    )
}

export default Navbar