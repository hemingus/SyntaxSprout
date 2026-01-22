interface Showcase {
    headerText: string
    imageURL: string
    altText: string
    paragraphText: string
}

export const showcases: Showcase[] = [
    {
        headerText: "Start with a sentence",
        imageURL: "./assets/gifs/startwithasentence.gif",
        altText: "Gif of how a sentence input turns into the base of the syntax tree.",
        paragraphText: "The base of the syntax tree is instantly created with just the input a sentence."
    },
    {
        headerText: "Build and edit with ease",
        imageURL: "./assets/gifs/buildwithease.gif",
        altText: "Gif that shows fast syntax tree construction with SyntaxSprout.",
        paragraphText: "SyntaxSprout gives you the tools to visually build and alter your syntax tree without the headache of bracket notation."
    },
    {
        headerText: "Multiple themes",
        imageURL: "./assets/gifs/themedemonstration.gif",
        altText: "Gif that shows how you can change the theme of a syntax tree.",
        paragraphText: "With several themes to choose from, pick one that suits your preference."
    }
]