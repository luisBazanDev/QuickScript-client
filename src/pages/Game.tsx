import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faGear,
  faRedo,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/atoms/logo";
import Modal from "../components/atoms/modal";
import LbTyper from "../components/organisms/lb_typer";

const Game: React.FC = () => {
  const [language, setLanguage] = useState("es");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    // toca reiniciar el test
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center bg-quickscript_dark_gray">
      <header className="w-full flex justify-between items-center p-4">
        <Logo logoType="secondary" />
        <a href="#">
          <FontAwesomeIcon
            icon={faGear}
            className="h-4 w-4 text-quickscript_light_gray"
          />
        </a>
      </header>
      <main className="flex flex-col items-center w-full flex-1 p-4">
        <div className="w-full flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faEarthAmerica}
            className="h-4 w-4 mt-1 text-quickscript_light_gray mr-2"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="appearance-none bg-transparent border-none text-quickscript_light_gray p-0 outline-none hover:underline"
          >
            {language === "es"
              ? "Spanish"
              : language === "en"
              ? "English"
              : "Other"}
          </button>
        </div>
        <div className="w-full max-w-3xl p-4 rounded-md shadow-md mb-4">
          <LbTyper />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleReset}
            className="p-2 rounded-full transition-colors"
          >
            <FontAwesomeIcon
              icon={faRedo}
              className="h-6 w-6 text-quickscript_light_gray hover:text-quickscript_green"
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
