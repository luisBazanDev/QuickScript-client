import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (language: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSelectLanguage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-bg-color rounded-lg p-6 w-80 text-text-color">
        <h2 className="text-xl font-bold mb-4">Selecciona un idioma</h2>
        <ul>
          <li className="mb-2">
            <button
              className="w-full text-center p-2 rounded hover:bg-input-color"
              onClick={() => onSelectLanguage('es')}
            >
              Spanish
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full text-center p-2 rounded hover:bg-input-color"
              onClick={() => onSelectLanguage('en')}
            >
              English
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full text-center p-2 rounded hover:bg-input-color"
              onClick={() => onSelectLanguage('other')}
            >
              Other
            </button>
          </li>
        </ul>
        <button
          className="mt-4 w-full p-2 bg-bg-color text-text-color rounded hover:bg-red-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;