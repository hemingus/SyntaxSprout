import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { dataURLToBlob } from "../utils/dataConvertion";
import DownloadIcon from "../assets/download.svg?react"

interface HtmlToImageButtonProps {
    element: HTMLElement | null
    imageName: string
}

const HtmlToImageButton = ({element, imageName}: HtmlToImageButtonProps) => {

    const handleDownload = async () => {
        if (!element) return;

        element.scrollTop = 0;
        element.scrollLeft = 0;

        const originalOverflow = element.style.overflow;
        element.style.overflow = 'visible';

        // wait two frames for layout to stabilize
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);

        try {
            const dataUrl = await htmlToImage.toPng(element, { pixelRatio: 2 });
            const blob = dataURLToBlob(dataUrl);
            saveAs(blob, `${imageName}.png`);
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            element.style.overflow = originalOverflow;
        }
    };

    return (
        <button className="whitespace-nowrap flex gap-2 items-center cursor-pointer text-2xl text-white 
        bg-gradient-to-b from-slate-800 to-slate-700 pr-4 py-2 rounded-xl
        hover:bg-gradient-to-b hover:from-slate-900 hover:to-blue-950" 
            onClick={handleDownload}>
                <DownloadIcon className="h-[clamp(2rem,4vw,3rem)] w-auto text-sky-500"/>
                Download (PNG)
        </button>
    )
}

export default HtmlToImageButton