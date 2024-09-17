export type TreeSetting = {
    nodeSize: string
    xGap: string
    yGap: string
}

export const nodeSizeOptions = [
    "text-[12px]","text-[14px]","text-[16px]","text-[20px]","text-[24px]"]

export const xGapOptions = [
    "gap-[4px]","gap-[8px]","gap-[12px]","gap-[16px]","gap-[20px]"]

export const yGapOptions = [
    "gap-[16px]","gap-[24px]","gap-[36px]","gap-[48px]","gap-[60px]"]

export const defaultSetting = {
    nodeSize: "text-[20px]",
    xGap: "gap-[16px]",
    yGap: "gap-[48px]"
}