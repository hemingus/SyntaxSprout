import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { dataURLToBlob } from "../utils/DataConvertion";
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
        <button className="flex-1 whitespace-nowrap flex gap-2 items-center cursor-pointer text-2xl text-white 
        bg-gradient-to-b from-slate-800 to-slate-700 pr-4 py-2 rounded-xl" 
            onClick={handleDownload}>
                <DownloadIcon className="h-[clamp(2rem,4vw,3rem)] w-auto text-blue-400"/>
                Download
        </button>
    )
}

export default HtmlToImageButton