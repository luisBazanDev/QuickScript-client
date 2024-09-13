import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmerica, faRedo } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/atoms/logo';

const Game: React.FC = () => {
  const [language, setLanguage] = useState('es');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleReset = () => {
    // toca reiniciar el test
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center bg-quickscript_dark_gray">
      <header className="w-full flex justify-between items-center p-4">
        <Logo logoType='secondary'/>
      </header>
      <main className="flex flex-col items-center w-full flex-1 p-4">
        <div className="w-full flex justify-center mb-4">
          <FontAwesomeIcon icon={faEarthAmerica} className="h-6 w-6 text-quickscript_light_gray mr-2" />
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border rounded-md"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div className="w-full max-w-3xl p-4 rounded-md shadow-md mb-4 bg-white">
          {/* componente lb */}
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleReset}
            className="p-2 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faRedo} className="h-6 w-6 text-quickscript_light_gray hover:text-quickscript_green" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Game;