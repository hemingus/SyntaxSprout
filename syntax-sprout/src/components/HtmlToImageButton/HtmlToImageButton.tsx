import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { dataURLToBlob } from "../../utils/DataConvertion";

interface HtmlToImageButtonProps {
    element: HTMLElement | null
}

const HtmlToImageButton = ({element}: HtmlToImageButtonProps) => {

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
                        saveAs(blob, 'syntax-tree.png');
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
        <button onClick={handleDownload}>Download as image</button>
    )
}

export default HtmlToImageButton