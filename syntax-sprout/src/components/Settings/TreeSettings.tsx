import { TreeSetting, nodeSizeOptions, xGapOptions, yGapOptions } from "./SettingsData"
import { useTreeSetting } from "./SettingsContex"
import { useEffect } from "react"

const TreeSettings = () => {
    const {setting, setSetting} = useTreeSetting()

    useEffect(() => {
        console.log(setting);
    }, [setting]);

    function handleNodeSize(size: string) {
        const newSize = size
        const newSetting: TreeSetting = {
            nodeSize: newSize,
            xGap: setting.xGap,
            yGap: setting.yGap
        }
        setSetting(newSetting)
    }

    function handleXgap(newXgap: string) {
        const newSetting: TreeSetting = {
            nodeSize: setting.nodeSize,
            xGap: newXgap,
            yGap: setting.yGap
        }
        setSetting(newSetting)
    } 

    function handleYgap(newYgap: string) {
        const newSetting: TreeSetting = {
            nodeSize: setting.nodeSize,
            xGap: setting.xGap,
            yGap: newYgap
        }
        setSetting(newSetting)
    } 

    return (
        <div className="m-4">
            <div className="flex flex-row justify-start items-center">
                <label className="text-white mr-1">Size:</label>
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
            <div className="flex flex-row justify-start items-center">
                <label className="text-white mr-1">Width:</label>
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
            <div className="flex flex-row justify-start items-center">
                <label className="text-white mr-1">Height:</label>
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
            <p className="text-white">{JSON.stringify(setting)}</p>
        </div>
    )
}

export default TreeSettings