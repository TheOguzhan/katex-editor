//  @ts-nocheck
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BlockMath, InlineMath } from "react-katex";
import * as ReactSS from "./use-react-screenshot";
import { writeImage, writeText } from "tauri-plugin-clipboard-api";

function App() {
  const [eq, setEq] = useState<string>("");
  const [image, takeScreenshot] = ReactSS.useScreenshot();
  const ref = useRef<HTMLDivElement>(null);
  const getImage = async () => {
    let imgsa = await takeScreenshot(ref.current);
    let imgbase64 = imgsa?.toString().replace("data:image/png;base64,", "");
    while (imgbase64?.charAt(imgbase64.length - 1) === "=") {
      imgbase64 = imgbase64.slice(0, -1);
    }
    writeImage(imgbase64);
  };

  return (
    <div className="container">
      <textarea
        id="greet-input"
        onChange={(e) => {
          setEq(e.currentTarget.value);
        }}
        placeholder="Write Eq"
      />
      <button type="button" onClick={getImage}>
        press
      </button>
      <div
        ref={ref}
        style={{
          display: "inline-block",
          overflow: "visible",
          padding: "5px 10px",
          width: "fit-content",
        }}
      >
        <BlockMath math={eq} />
      </div>
    </div>
  );
}

export default App;
