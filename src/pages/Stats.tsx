import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/atoms/logo';

const Stats: React.FC = () => {
    return (
      <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center bg-bg-color">
        <header className="w-full flex justify-between items-center p-4">
          <a href="/"><Logo logoType='secondary' /></a>
          <a href="/Config"><FontAwesomeIcon icon={faGear} className="h-4 w-4 text-icon-color" /></a>
        </header>
        <main className="flex flex-col items-center w-full flex-1 p-4">
          <div className="w-full max-w-3xl p-4 rounded-md shadow-md mb-4 bg-bg-color">

          </div>
        </main>
      </div>
    );
};

export default Stats;