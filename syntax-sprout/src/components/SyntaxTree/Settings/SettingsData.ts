export type TreeSetting = {
    nodeSize: string
    xGap: string
    yGap: string
}

export const nodeSizeOptions = [
    "text-[12px]","text-[14px]","text-[16px]","text-[18px]","text-[20px]","text-[24px]","text-[28px]"]

export const xGapOptions = [
    "gap-0","gap-[4px]","gap-[8px]","gap-[12px]","gap-[16px]","gap-[20px]","gap-[24px]"]

export const yGapOptions = [
    "gap-[16px]","gap-[20px]","gap-[24px]","gap-[32px]","gap-[40px]","gap-[48px]","gap-[56px]"]

export const defaultSetting = {
    nodeSize: "text-[20px]",
    xGap: "gap-[16px]",
    yGap: "gap-[48px]"
}