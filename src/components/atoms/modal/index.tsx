import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (language: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSelectLanguage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-quickscript_dark_gray rounded-lg p-6 w-80 text-quickscript_white">
        <h2 className="text-xl font-bold mb-4">Selecciona un idioma</h2>
        <ul>
          <li className="mb-2">
            <button
              className="w-full text-center p-2 rounded hover:bg-quickscript_gray"
              onClick={() => onSelectLanguage("es")}
            >
              Spanish
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full text-center p-2 rounded hover:bg-quickscript_gray"
              onClick={() => onSelectLanguage("en")}
            >
              English
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full text-center p-2 rounded hover:bg-quickscript_gray"
              onClick={() => onSelectLanguage("other")}
            >
              Other
            </button>
          </li>
        </ul>
        <button
          className="mt-4 w-full p-2 bg-quickscript_dark_gray text-white rounded hover:bg-red-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
