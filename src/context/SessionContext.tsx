import { createContext, useState } from "react";
import { SessionContextType, Error, Register } from "../types";

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errors, setErrors] = useState<Error[]>([]);
  const [regisrters, setRegisters] = useState<Register[]>([]);
  const [session, setSession] = useState<SessionContextType["session"]>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const duration = 30; // CONSTANT
  const [text, setText] = useState<string | null>(
    "El sistema permite practicar la escritura de textos comunes o código de programación en varios lenguajes, lo que lo hace útil para estudiantes, programadores y cualquier persona interesada en mejorar sus habilidades de escritura. Los usuarios recibirán estadísticas detalladas sobre su desempeño, que incluyen palabras por minuto (WPM), tiempo promedio de escritura, errores cometidos y otras métricas importantes. Se guarda esta información en una base de datos, lo que permite el análisis de los datos en el tiempo para evaluar el progreso individual."
  );

  const addRegister = (register: Register) => {
    setRegisters((r) => [...r, register]);
  };

  const addError = (error: Error) => {
    if (!startTime || error.time < startTime) return;
    error.time = (error.time - startTime) / 1000;
    setErrors((e) => [...e, error]);
  };

  const start = () => {
    setStartTime(Date.now());
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        addRegister,
        addError,
        start,
        startTime,
        duration,
        text,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
