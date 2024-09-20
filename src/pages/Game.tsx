import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faEarthAmerica,
  faGear,
  faRedo,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/atoms/logo";
import Modal from "../components/atoms/modal";
import LbTyper from "../components/organisms/lb_typer";
import { useSession } from "../hooks/sessionHook";
import { formatTime } from "../utils";

import "./game.css";

const Game: React.FC = () => {
  const [language, setLanguage] = useState("es");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { restart, startTime, duration, is_finished, finish } = useSession();
  const [countDown, setCountDown] = useState<number>(duration ?? 30);

  const isFinished = useRef(is_finished);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    restart();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    isFinished.current = is_finished;
  }, [is_finished]);

  useEffect(() => {
    if (isFinished.current) return;
    if (startTime === null) return;
    if (countDown === 0) finish();
  }, [countDown]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFinished.current) return;
      if (startTime === null) return;
      setCountDown((c) => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center bg-bg-color">
      <header className="w-full flex justify-between items-center p-4">
        <Logo logoType="secondary" />
        <div className="relative flex items-center">
          <div>
            <a href="#" onClick={toggleMenu}>
              <FontAwesomeIcon
                icon={faUser}
                className="h-4 w-4 mr-3 text-icon-color hover:text-logo-color transition-colors"
              />
            </a>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-bg-color rounded-md shadow-lg z-20">
                <a
                  href="/stats"
                  className="block px-4 py-2 text-icon-color hover:text-logo-color"
                >
                  <FontAwesomeIcon icon={faChartSimple} className="mr-2" />
                  Estadísticas
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-icon-color hover:text-logo-color"
                >
                  <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
          <div>
            <a href="/config">
              <FontAwesomeIcon
                icon={faGear}
                className="h-4 w-4 text-icon-color hover:text-logo-color transition-colors"
              />
            </a>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center w-full flex-1 p-4">
        <div className="w-full flex justify-between mb-4 max-w-3xl">
          <div className="">
            <span className="text-text-color">Countdown: </span>
            <span className="text-logo-color">{formatTime(countDown)}</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="appearance-none bg-transparent border-none text-icon-color p-0 outline-none hover:underline"
          >
            {language === "es"
              ? "Spanish"
              : language === "en"
              ? "English"
              : "Other"}
          </button>
          <div></div>
        </div>
        <div className="w-full max-w-3xl p-4 rounded-md mb-4 h-64 relative">
          <LbTyper />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleReset}
            className="p-2 rounded-full transition-colors cursor-pointer z-0"
          >
            <FontAwesomeIcon
              icon={faRedo}
              className="h-6 w-6 text-icon-color hover:text-logo-color"
            />
          </button>
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectLanguage={handleLanguageChange}
      />
    </div>
  );
};

export default Game;
