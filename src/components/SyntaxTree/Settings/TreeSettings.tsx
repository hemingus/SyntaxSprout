import { TreeSetting, Font, fontOptions, nodeSizeOptions, xGapOptions, yGapOptions } from "./SettingsData"
import { useTreeSetting } from "./SettingsContex"
import { useEffect } from "react"

const TreeSettings = () => {
    const {setting, setSetting} = useTreeSetting()

    useEffect(() => {
    }, [setting])

    function handleNodeSize(size: string) {
        const newSetting: TreeSetting = {
            ...setting, nodeSize: size
        }
        setSetting(newSetting)
    }

    function handleXgap(newXgap: string) {
        const newSetting: TreeSetting = {
            ...setting, xGap: newXgap
        }
        setSetting(newSetting)
    } 

    function handleYgap(newYgap: string) {
        const newSetting: TreeSetting = {
            ...setting, yGap: newYgap
        }
        setSetting(newSetting)
    }

    function handleFontStyle(newFont: Font) {
        const newSetting: TreeSetting = {
            ...setting, font: newFont
        }
        setSetting(newSetting)
    }

    return (
        <div className="border-solid border-slate-400 p-4 rounded">
            <h2 className="text-white m-1">Tree Settings ⚙️</h2>
            <div className="w-fit flex flex-row justify-between items-center">
                <label className="w-14 text-white mr-1">Size:</label>
                {nodeSizeOptions.map((size: string, index: number) => (
                <li
                    onClick={() => handleNodeSize(size)} 
                    className={`solid p-2 m-0 rounded list-none 
                    ${size === setting.nodeSize ? "bg-gradient-to-b from-slate-800 to-green-500" 
                        : "bg-gradient-to-b from-slate-800 to-slate-500"}
                    text-white
                    cursor-pointer 
                    hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500`}
                    key={size}>
                        {index+1}
                </li>
                ))}
            </div>
            <div className="w-fit flex flex-row justify-between items-center">
                <label className="w-14 text-white mr-1">Width:</label>
                {xGapOptions.map((gap: string, index: number) => (
                <li
                    onClick={() => handleXgap(gap)} 
                    className={`solid p-2 m-0 rounded list-none
                    ${gap === setting.xGap ? "bg-gradient-to-b from-slate-800 to-green-500" 
                        : "bg-gradient-to-b from-slate-800 to-slate-500"}
                    text-white
                    cursor-pointer 
                    hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500`}
                    key={gap}>
                        {index+1}
                </li>
                ))}
            </div>
            <div className="w-fit flex flex-row justify-between items-center">
                <label className="w-14 text-white mr-1">Height:</label>
                {yGapOptions.map((gap: string, index: number) => (
                <li
                    onClick={() => handleYgap(gap)} 
                    className={`solid p-2 m-0 rounded list-none 
                    ${gap === setting.yGap ? "bg-gradient-to-b from-slate-800 to-green-500" 
                        : "bg-gradient-to-b from-slate-800 to-slate-500"}
                    text-white
                    cursor-pointer 
                    hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500`}
                    key={gap}>
                        {index+1}
                </li>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <h3 className="w-full mb-0 mt-2 text-center text-white mr-1 col-span-2">Font</h3>
                    {fontOptions.map((font: Font) => (
                    <li
                        onClick={() => handleFontStyle(font)} 
                        className={`solid p-2 m-0 rounded list-none ${font.style} font-semibold text-center
                        ${font.name === setting.font.name ? "bg-gradient-to-b from-slate-800 to-green-500" 
                            : "bg-gradient-to-b from-slate-800 to-slate-500"}
                        text-white
                        cursor-pointer 
                        hover:bg-gradient-to-b hover:from-slate-700 hover:to-lime-500`}
                        key={font.name}>
                            {font.name}
                    </li>
                    ))}
            </div>
        </div>
    )
}

export default TreeSettings