// @ts-nocheck
import react from "react";
import html2canvas from "html2canvas";

const useScreenshot = (type?: string | undefined, quality?: any) => {
  const [image, setImage] = react.useState<string | null>(null);
  const [error, setError] = react.useState(null);
  /**
   * convert html node to image
   * @param {HTMLElement} node
   */
  const takeScreenShot = (node: HTMLElement) => {
    if (!node) {
      throw new Error("You should provide correct html node.");
    }
    return html2canvas(node)
      .then((canvas) => {
        const croppedCanvas = document.createElement("canvas");
        const croppedCanvasContext = croppedCanvas.getContext("2d");
        // init data
        const cropPositionTop = 0;
        const cropPositionLeft = 0;
        const cropWidth = canvas.width;
        const cropHeight = canvas.height;

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        croppedCanvasContext?.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop,
        );

        const base64Image = croppedCanvas.toDataURL(type, quality);

        setImage(base64Image);
        return base64Image;
      })
      .catch(setError);
  };

  return [
    image,
    takeScreenShot,
    {
      error,
    },
  ];
};

/**
 * creates name of file
 * @param {string} extension
 * @param  {string[]} parts of file name
 */
const createFileName = (extension: string, names: string[]) => {
  if (!extension) {
    return "";
  }

  return `${names.join("")}.${extension}`;
};

export { useScreenshot, createFileName };
