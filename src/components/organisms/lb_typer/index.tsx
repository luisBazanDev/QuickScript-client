import { useEffect, useState } from "react";

import "./style.css";
import { LbChar, LbWord } from "../../../types";

function compareWords(expected: string, actually: string): LbWord {
  const chars: LbChar[] = [];

  for (let i = 0; i < expected.length; i++) {
    const letter = expected[i];

    if (!actually || !actually[i]) {
      chars.push({
        letter,
        void: true,
        correct: false,
        extra: false,
      });
      continue;
    }

    if (letter !== actually[i]) {
      chars.push({
        letter: actually[i],
        void: false,
        correct: false,
        extra: true,
      });
      continue;
    }

    if (letter === actually[i]) {
      chars.push({
        letter,
        void: false,
        correct: true,
        extra: false,
      });
      continue;
    }
  }

  if (actually && actually.length > expected.length) {
    for (let i = expected.length; i < actually.length; i++) {
      chars.push({
        letter: actually[i],
        void: false,
        correct: false,
        extra: true,
      });
    }
  }

  return {
    word: expected,
    type: expected === actually ? "correct" : "error",
    chars,
  };
}

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

  const wordsRender = words.map((word, i) => {
    return compareWords(word, text.split(" ")[i]);
  });

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
        if (!e.key.match(/[a-zA-Z]/) && ",./\\{}[]'\"".indexOf(e.key) === -1)
          return;

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

    console.log(wordsRender);

    return () => {
      typerMainFocus.removeEventListener("keydown", keydown);
      typerMainFocus.removeEventListener("focusout", focusout);
      typerMainFocus.removeEventListener("focusin", focusin);
    };
  }, [indexWord, indexText]);

  return (
    <div className="w-full h-full" onClick={handleFocus}>
      <div
        className={`font-mono text-3xl flex gap-4 select-none flex-wrap ${
          focus ? "" : "blur-sm"
        }`}
      >
        {wordsRender.map((word, indexW) => {
          return (
            <div
              className={`${
                word.type === "error" && indexW < indexText ? "word-error" : ""
              }`}
            >
              {word.chars.map((char, indexC) => {
                return (
                  <span
                    className={`${
                      char.correct
                        ? "text-green-300"
                        : char.void
                        ? "text-gray-400"
                        : "text-red-400"
                    } ${char.extra ? "text-red-900" : ""}`}
                  >
                    {char.letter}
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
