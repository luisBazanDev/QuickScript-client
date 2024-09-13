import { useEffect, useState } from "react";

import "./style.css";
function LbTyper() {
  const textTest = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

  const words = textTest.trim().split(" ");

  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const [indexWord, setIndexWord] = useState(0);
  const [indexText, setIndexText] = useState(0);

  const handleFocus = (e: React.MouseEvent) => {
    const typerMainFocus = document.getElementById("typer-main-focus");

    e.preventDefault();

    typerMainFocus?.focus();
  };

  useEffect(() => {
    const typerMainFocus = document.getElementById("typer-main-focus");

    if (!typerMainFocus) return;

    typerMainFocus.removeEventListener("keydown", () => {});
    typerMainFocus.removeEventListener("focusout", () => {});
    typerMainFocus.removeEventListener("focusin", () => {});

    const keydown = (e: KeyboardEvent) => {
      // Ignore if the key is not a letter
      if (e.key === "Backspace") {
        if (indexWord > 0) {
          setIndexWord((i) => i - 1);
          setText((t) => t.slice(0, -1));
        }
      } else if (e.key === " ") {
        setIndexText((i) => i + 1);
        setIndexWord(0);
        setText((t) => t + e.key);
      } else {
        if (!e.key.match(/[a-zA-Z]/)) return;
        if (e.key.length > 1) return;
        setText((t) => t + e.key);
        setIndexWord((i) => i + 1);
      }
    };

    const focusout = () => {
      setTimeout(() => {
        // Check if the element is focused
        if (!document.activeElement?.id.includes("typer-main-focus")) {
          setFocus(false);
        }
      }, 300);
      console.log("focus out");
    };

    const focusin = () => {
      setFocus(true);
      console.log("focus in");
    };

    typerMainFocus.addEventListener("keydown", keydown);
    typerMainFocus.addEventListener("focusout", focusout);
    typerMainFocus.addEventListener("focusin", focusin);

    return () => {
      typerMainFocus.removeEventListener("keydown", keydown);
      typerMainFocus.removeEventListener("focusout", focusout);
      typerMainFocus.removeEventListener("focusin", focusin);
    };
  }, [indexWord, indexText]);

  return (
    <div className="w-full h-full" onClick={handleFocus}>
      <div
        className={`font-mono text-3xl flex gap-4 select-none ${
          focus ? "" : "blur-sm"
        }`}
      >
        {words.map((word, indexW) => {
          return (
            <div
              className={`${
                indexW >= indexText
                  ? "word"
                  : word === text.split(" ")[indexW]
                  ? "word-correct"
                  : "word-error"
              }`}
            >
              {(indexW < indexText
                ? text.split(" ")[indexW]
                : indexW > indexText
                ? word
                : text.split(" ")[indexW].slice(0, indexWord) +
                  word.slice(indexWord, word.length)
              )
                .split("")
                .map((letter, indexL) => {
                  return indexW === indexText && indexL === indexWord ? (
                    <span
                      key={indexL}
                      className={`focus-letter text-white relative`}
                    >
                      {letter}
                    </span>
                  ) : (
                    <span key={indexL} className="text-gray-400">
                      {letter}
                    </span>
                  );
                })}
            </div>
          );
        })}
      </div>
      <input type="text" className="opacity-0" id="typer-main-focus" />
    </div>
  );
}

export default LbTyper;
