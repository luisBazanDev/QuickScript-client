import { useEffect, useState, useRef, useMemo } from "react";

import "./style.css";
import { Error, LbChar, LbWord } from "../../../types";
import { useSession } from "../../../hooks/sessionHook";

function compareWords(expected: string, actually: string): LbWord {
  const chars: LbChar[] = [];

  if (!expected) {
    return {
      word: expected,
      type: "error",
      chars: [],
    };
  }

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
  const { text, addError, start, startTime, addRegister } = useSession();

  if (!text) return null;

  const words = text.trim().split(" ");

  const [currentText, setCurrentText] = useState("");
  const [focus, setFocus] = useState(false);
  const [indexWord, setIndexWord] = useState(0);
  const [indexText, setIndexText] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentError, setCurrentError] = useState<Error | null>(null);
  const [typeLetter, setTypeLetter] = useState<boolean>(false);
  const [typeWord, setTypeWord] = useState<boolean>(false);
  const [indexSpeed, setIndexSpeed] = useState<number>(0);

  const handleFocus = (e: React.MouseEvent) => {
    const typerMainFocus = document.getElementById("typer-main-focus");
    e.preventDefault();
    typerMainFocus?.focus();
  };

  const wordsRender = words.map((word, i) => {
    return compareWords(word, currentText.split(" ")[i]);
  });

  // Check if the last word is complete
  useEffect(() => {
    if (!typeWord) return;

    if (indexText === words.length - 1) {
      // TODO: Finish logic
      console.log("Finish");
      return;
    }

    // Check if the last word is complete
    const lastWord = compareWords(
      words[indexText - 1],
      currentText.split(" ")[indexText - 1]
    );

    let voids = 0;

    lastWord.chars.forEach((char, index) => {
      if (char.void) voids++;
    });

    if (currentError !== null) {
      voids += currentError.amount_errors;
      setCurrentError(null);
    }

    if (voids === 0) return;

    addError({
      amount_errors: voids,
      time: Date.now(),
    });
  }, [typeWord]);

  // Check if the last letter is correct
  useEffect(() => {
    if (!typeLetter) return;

    const actualWord = compareWords(
      words[indexText],
      currentText.split(" ")[indexText]
    );

    if (!actualWord.chars[indexWord - 1]) return;

    // It's not a error
    if (actualWord.chars[indexWord - 1].correct) {
      if (!currentError) return;

      // Break the error chain
      addError(currentError);
      setCurrentError(null);
      return;
    }

    // It's a bug?
    if (actualWord.chars[indexWord - 1].void) return;

    // It's a error
    setCurrentError((e) =>
      e === null
        ? { amount_errors: 1, time: Date.now() }
        : { amount_errors: e.amount_errors + 1, time: e.time }
    );
  }, [typeLetter]);

  // Interval to calculate WPM
  useEffect(() => {
    if (startTime === null) return;

    const interval = setInterval(() => {}, 3 * 1000); // 3 seconds

    return () => clearInterval(interval);
  }, [startTime]);

  // Logic to type
  useEffect(() => {
    const typerMainFocus = document.getElementById("typer-main-focus");

    if (!typerMainFocus) return;

    typerMainFocus.removeEventListener("keydown", () => {});
    typerMainFocus.removeEventListener("focusout", () => {});
    typerMainFocus.removeEventListener("focusin", () => {});

    const keydown = (e: KeyboardEvent) => {
      if (startTime === null) {
        start();
      }
      setTypeLetter(false);
      setTypeWord(false);
      if (e.key === "Backspace" && indexWord > 0) {
        setIndexWord((i) => i - 1);
        setCurrentText((t) => t.slice(0, -1));

        // none
      } else if (e.key === " ") {
        if (indexText === words.length - 1) return;
        setIndexText((i) => i + 1);
        setIndexWord(0);
        setCurrentText((t) => t + e.key);
        setTypeWord(true);
      } else {
        if (!e.key.match(/^[a-zA-Z0-9\W]+$/)) return;

        if (e.key.length > 1) return;
        setCurrentText((t) => t + e.key);
        setIndexWord((i) => i + 1);
        setTypeLetter(true);
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
        className={`absolute text-white font-mono text-xl left-[50%] top-[50%] -translate-x-[50%] shadow-md -translate-y-[50%] ${
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
                        ? "text-quickscript_white"
                        : char.void
                        ? "text-quickscript_light_gray"
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
      <input
        type="text"
        className="opacity-0"
        id="typer-main-focus"
        autoComplete="off"
      />
    </div>
  );
}

export default LbTyper;
