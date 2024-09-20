import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/atoms/logo';
import Button from '../components/atoms/button';
import { ThemeContext } from '../context/ThemeContext';

const Config = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-4 bg-bg-color text-text-color">
        <a href="/"><Logo logoType='secondary' /></a>
        <a><FontAwesomeIcon icon={faGear} className="h-4 w-4 text-icon-color" /></a>
      </header>
      <main className="flex flex-col items-center w-full flex-1 p-4 bg-bg-color text-text-color">
        <div className="w-full flex flex-col items-center mb-4">
          <div className="border-t border-gray-300 w-full opacity-50 mb-4"></div>
          <div className="flex justify-between w-full">
            <span className="mr-2">Change theme</span>
            <div className='w-1/3'>
              <Button buttonType="secondary" onClick={toggleTheme}>
                Toggle Theme
              </Button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Config;