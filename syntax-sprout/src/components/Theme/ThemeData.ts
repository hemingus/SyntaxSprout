export type Theme = {
    name: string;
    root: string;
    node: string;
    leaf: string;
    canvas: string;
}

// Define your themes
export const DefaultTheme: Theme = {
    name: "DefaultTheme",
    root: "solid bg-black",
    node: "solid bg-black text-blue-300 border-blue-700",
    leaf: "solid bg-black text-lime-300 border-lime-600",
    canvas: "bg-gradient-to-b from-canvas-green to-canvas-brown",
}

export const PlainTheme: Theme = {
    name: "PlainTheme",
    root: "text-black font-bold",
    node: "text-blue-800 font-bold",
    leaf: "text-black font-bold",
    canvas: "bg-white",
}

export const PinkCraze: Theme = {
    name: "PinkCraze",
    root: "solid bg-red-700 text-white border-pink-300 font-bold shadow shadow-pink-900",
    node: "solid bg-pink-200 text-black border-pink-500 font-bold",
    leaf: "solid bg-pink-700 text-white border-pink-300 font-medium shadow-md shadow-pink-900",
    canvas: "bg-pink-100"
}

export const Themes: Theme[] = [
    DefaultTheme,
    PlainTheme,
    PinkCraze
]