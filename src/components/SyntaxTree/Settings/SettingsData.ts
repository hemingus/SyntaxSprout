export type Font = {
    name: string
    style: string
}

export type TreeSetting = {
    nodeSize: string
    xGap: string
    yGap: string
    font: Font
}

export const nodeSizeOptions = [
    "text-[12px]","text-[14px]","text-[16px]","text-[18px]","text-[20px]","text-[24px]","text-[28px]"]

export const xGapOptions = [
    "gap-0","gap-[4px]","gap-[8px]","gap-[12px]","gap-[16px]","gap-[20px]","gap-[24px]"]

export const yGapOptions = [
    "gap-[16px]","gap-[20px]","gap-[24px]","gap-[32px]","gap-[40px]","gap-[48px]","gap-[56px]"]

export const fontOptions: Font[] = [
    {name: "default", style: ""},
    {name: "roboto", style: "font-roboto"}, 
    {name: "lobster", style: "font-lobster"},
    {name: "playfair", style: "font-playfair"},
    ]

export const defaultSetting = {
    nodeSize: "text-[18px]",
    xGap: "gap-[12px]",
    yGap: "gap-[32px]",
    font: {name: "default", style: ""}
}