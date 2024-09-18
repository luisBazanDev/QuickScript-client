import React, { useState, useEffect } from "react";
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

const Game: React.FC = () => {
  const [language, setLanguage] = useState("es");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    // restart the test
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center bg-quickscript_dark_gray">
      <header className="w-full flex justify-between items-center p-4">
      <Logo logoType="secondary" />
      <div className="relative flex items-center">
        <div>
          <a href="#" onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={faUser}
              className="h-4 w-4 mr-3 text-quickscript_light_gray hover:text-quickscript_green transition-colors"
            />
          </a>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-quickscript_gray rounded-md shadow-lg z-20">
              <a href="/stats" className="block px-4 py-2 text-quickscript_white hover:text-quickscript_green">
                <FontAwesomeIcon icon={faChartSimple} className="mr-2" />
                Estadísticas
              </a>
              <a href="/logout" className="block px-4 py-2 text-quickscript_white hover:text-quickscript_green">
                <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                Logout
              </a>
            </div>
          )}
        </div>
        <div>
          <a href="#">
            <FontAwesomeIcon
              icon={faGear}
              className="h-4 w-4 text-quickscript_light_gray hover:text-quickscript_green transition-colors"
            />
          </a>
        </div>
      </div>
    </header>
      <main className="flex flex-col items-center w-full flex-1 p-4">
        <div className="w-full flex justify-center mb-4 ">
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
        <div className="w-full max-w-3xl p-4 rounded-md mb-4 h-64 relative">
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
