import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex justify-center items-center top-0 left-0 w-full gap-5 p-1 bg-gradient-to-b from-transparent to-black">
        <NavLink
            to="/dashboard"
            className={({ isActive }) =>
                `no-underline
                text-center
                text-md
                xs:text-2xl
                font-bold
                p-2
                m-1 xs:m-3
                rounded-xl
                bg-gradient-to-b from-green-800 to-black
                border-solid border-[1px] border-black
                hover:from-green-600 hover:to-black
                ${isActive ? 
                "text-lime-400" 
                : 
                "text-lime-500"}
            `}
        >
            Dashboard
        </NavLink>

        <NavLink
            to="/tutorial"
            className={({ isActive }) =>
                `no-underline
                text-center
                text-md
                xs:text-2xl
                font-bold
                p-2
                m-1 xs:m-3
                rounded-xl
                bg-gradient-to-b from-green-800 to-black
                border-solid border-[1px] border-black
                hover:from-green-600 hover:to-black
                ${isActive ? 
                "text-lime-400" 
                : 
                "text-lime-500"}
            `}
        >
            Tutorial
        </NavLink>

        <NavLink
            to="/about"
            className={({ isActive }) =>
                `no-underline
                text-center
                text-md
                xs:text-2xl
                font-bold
                p-2
                m-1 xs:m-3
                rounded-xl
                bg-gradient-to-b from-green-800 to-black
                border-solid border-[1px] border-black
                hover:from-green-600 hover:to-black
                ${isActive ? 
                "text-lime-400" 
                : 
                "text-lime-500"}
            `}
        >
            About
        </NavLink>
    </nav>
    )
}

export default Navbar