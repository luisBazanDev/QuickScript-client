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
  const textTest =
    "El sistema permite practicar la escritura de textos comunes o código de programación en varios lenguajes, lo que lo hace útil para estudiantes, programadores y cualquier persona interesada en mejorar sus habilidades de escritura. Los usuarios recibirán estadísticas detalladas sobre su desempeño, que incluyen palabras por minuto (WPM), tiempo promedio de escritura, errores cometidos y otras métricas importantes. Se guarda esta información en una base de datos, lo que permite el análisis de los datos en el tiempo para evaluar el progreso individual.";

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
        if (!e.key.match(/^[a-zA-Z0-9\W]+$/)) return;

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
    <div className="w-full h-full relative" onClick={handleFocus}>
      <div
        className={`absolute text-white font-mono text-xl left-[50%] top-[50%] -translate-x-[50%] shadow-md -translate-y-[50%] ${
          focus ? "hidden" : "flex"
        }`}
      >
        {"Click here to focus"}
      </div>
      <div
        className={`font-mono text-3xl flex gap-4 select-none flex-wrap transition-all ${
          focus ? "" : "blur-md"
        }`}
      >
        {wordsRender.map((word, indexW) => {
          return (
            <div
              className={`${
                word.type === "error" && indexW < indexText ? "word-error" : ""
              } relative`}
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
                    } ${char.extra ? "text-red-900" : ""} ${
                      indexW === indexText && indexC === indexWord
                        ? "focus-letter"
                        : ""
                    }`}
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
