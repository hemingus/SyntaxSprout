import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { dataURLToBlob } from "../utils/DataConvertion";

interface HtmlToImageButtonProps {
    element: HTMLElement | null
    imageName: string
}

const HtmlToImageButton = ({element, imageName}: HtmlToImageButtonProps) => {

    const handleDownload = (): void => {
        if (element) {
            // Scroll to the top left to capture the full tree
            element.scrollTop = 0;
            element.scrollLeft = 0;

            const originalOverflow = element.style.overflow;

            element.style.overflow = 'visible';
    
            setTimeout(() => {
                htmlToImage.toPng(element as HTMLElement, { pixelRatio: 2 }) // Increase pixel ratio for better quality
                    .then((dataUrl: string) => {
                        const blob = dataURLToBlob(dataUrl);
                        saveAs(blob, `${imageName}.png`);
                        element!.style.overflow = originalOverflow;
                    })
                    .catch((error: Error) => {
                        console.error('Error generating image:', error);
                        element!.style.overflow = originalOverflow;
                    });
            }, 500); // Delay to ensure DOM is fully rendered
        }
    };

    return (
        <button className="cursor-pointer p-4 text-xl bg-gradient-to-br from-emerald-500 to-slate-700 rounded-[2rem] 
        text-white border-slate-300 hover:shadow-[0px_0px_10px_5px_greenyellow]" 
            onClick={handleDownload}>
                📸 Download as image ⤓
        </button>
    )
}

export default HtmlToImageButton