export type Theme = {
    name: string;
    root: string;
    node: string;
    leaf: string;
    canvas: string;
    lines: string;
    arrows: string;
}

// Define your themes
export const DefaultTheme: Theme = {
    name: "DefaultTheme",
    root: "bg-black text-amber-300 border-amber-900 shadow shadow-black",
    node: "bg-black text-green-300 font-semibold border-green-800",
    leaf: "bg-black text-lime-300 font-semibold border-lime-600 shadow-md shadow-green-900",
    canvas: "bg-gradient-to-b from-canvas-green to-canvas-brown",
    lines: "#703515",
    arrows: "#50EE70"
}

export const PlainTheme: Theme = {
    name: "PlainTheme",
    root: "text-black font-bold border-black",
    node: "text-black font-bold border-transparent",
    leaf: "text-black font-bold border-transparent",
    canvas: "bg-white",
    lines: "black",
    arrows: "black"
}

export const PlainColor: Theme = {
    name: "PlainColor",
    root: "text-black font-bold border-black",
    node: "text-blue-600 font-bold border-transparent",
    leaf: "text-red-500 font-bold border-transparent",
    canvas: "bg-white",
    lines: "black",
    arrows: "black"
}

export const PinkCraze: Theme = {
    name: "PinkCraze",
    root: "bg-red-700 text-white border-pink-300 font-bold shadow shadow-pink-900",
    node: "bg-pink-200 text-black border-pink-500 font-bold",
    leaf: "bg-pink-700 text-white border-pink-300 font-medium shadow-md shadow-pink-900",
    canvas: "bg-pink-100",
    lines: "black",
    arrows: "black"
}

export const PurpleMagic: Theme = {
    name: "PurpleMagic",
    root: "bg-black text-indigo-300 border-indigo-500 font-bold shadow shadow-fuchsia-500",
    node: "bg-purple-900 text-white border-purple-500",
    leaf: "bg-black text-fuchsia-300 border-purple-500 font-medium shadow-md shadow-fuchsia-500",
    canvas: "bg-gradient-to-b from-purple-900 via-black to-purple-900",
    lines: "darkmagenta",
    arrows: "silver"
}

export const BlueDream: Theme = {
    name: "BlueDream",
    root: "bg-black text-indigo-300 border-indigo-500 font-bold shadow shadow-fuchsia-500",
    node: "bg-blue-950 text-white border-sky-600 font-medium",
    leaf: "bg-black text-sky-300 border-indigo-700 font-semibold shadow-md shadow-sky-500",
    canvas: "bg-gradient-to-t from-sky-400 via-blue-200 to-sky-400",
    lines: "black",
    arrows: "blue"
}

export const Themes: Theme[] = [
    DefaultTheme,
    PlainTheme,
    PlainColor,
    PinkCraze,
    PurpleMagic,
    BlueDream
]