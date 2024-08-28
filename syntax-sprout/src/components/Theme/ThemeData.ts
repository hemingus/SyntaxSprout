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
    root: "solid bg-red-700",
    node: "solid bg-yellow-300",
    leaf: "solid bg-orange-500",
    canvas: "bg-gray-500",
}

export const PlainTheme: Theme = {
    name: "PlainTheme",
    root: "text-black",
    node: "text-blue-500",
    leaf: "text-green-500",
    canvas: "bg-white",
}

export const Themes: Theme[] = [
    DefaultTheme,
    PlainTheme
]