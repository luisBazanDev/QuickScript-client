import { useEffect, useState, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const WORDS_PER_LINE = 7; // words per line to scroll

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
        if (!document.activeElement?.id.includes("typer-main-focus")) {
          setFocus(false);
        }
      }, 300);
    };

    const focusin = () => {
      setFocus(true);
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const word = document.querySelector(`.word-${indexText}`);

    if (word) {
      const absWordTop = word.getClientRects().item(0)?.top;
      const absContainerTop = container.getClientRects().item(0)?.top;

      if (!absWordTop || !absContainerTop) return;

      if (absWordTop > absContainerTop) {
        container.scrollTop += absWordTop - absContainerTop;
      }
    }
  }, [indexText]);

  return (
    <div className="w-full h-full relative" onClick={handleFocus}>
      <div
        className={`absolute text-text-color font-mono text-xl left-[50%] top-[50%] -translate-x-[50%] shadow-md -translate-y-[50%] ${
          focus ? "hidden" : "flex"
        }`}
      >
        {"Click here to focus"}
      </div>
      <div
        ref={containerRef}
        className={`no-scrollbar font-mono text-3xl flex gap-4 select-none flex-wrap transition-all w-full max-w-3xl p-4 rounded-md mb-4 h-64 relative overflow-y-auto overflow-x-hidden scroll-smooth ${
          focus ? "" : "blur-md"
        }`}
      >
        {wordsRender.map((word, indexW) => {
          return (
            <div
              key={`word-${indexW}`}
              className={`word-${indexW} ${
                word.type === "error" && indexW < indexText ? "word-error" : ""
              } relative`}
            >
              {word.chars.map((char, indexC) => {
                return (
                  <span
                    key={`char-${indexW}-${indexC}`}
                    className={`${
                      char.correct
                        ? "text-text-color"
                        : char.void
                        ? "text-icon-color"
                        : "text-red-700"
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
      <input
        type="text"
        className="opacity-0"
        id="typer-main-focus"
        autoComplete="false"
      />
    </div>
  );
}

export default LbTyper;
