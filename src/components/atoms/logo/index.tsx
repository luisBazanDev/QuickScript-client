import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faKeyboard } from '@fortawesome/free-regular-svg-icons';


const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-5 mb-10">
       <FontAwesomeIcon icon={faKeyboard} className='text-quickscript_green text-7xl mr-6'/>
      <span className="text-6xl font-bold text-white">QuickScript</span>
    </div>
  );
};

export default Logo;