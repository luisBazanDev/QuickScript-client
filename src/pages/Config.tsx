import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/atoms/logo';

const Config: React.FC = () => {
  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center bg-quickscript_dark_gray">
      <header className="w-full flex justify-between items-center p-4">
        <Logo logoType='secondary' />
        <a href="" >
          <FontAwesomeIcon icon={faGear} className="h-4 w-4 text-quickscript_light_gray" />
        </a>
      </header>
      <main className="flex flex-col items-center w-full flex-1 p-4">
          
      </main>
    </div>
  );
};

export default Config;