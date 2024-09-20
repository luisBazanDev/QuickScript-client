import { createContext, useEffect, useRef, useState } from "react";
import { SessionContextType, Error, Register, Session } from "../types";
import { saveSession } from "../client";

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
  const [endTime, setEndTime] = useState<number | null>(null);
  const duration: number = 10; // CONSTANT
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

  const buildSession = async () => {
    console.log("Building session");

    console.log(startTime);
    if (!startTime) return;

    let min_wpm = 1000;
    let max_wpm = 0;
    let total_wpm = 0;
    let errors_amount = 0;
    let total_letters = 0;

    regisrters.forEach((r) => {
      total_wpm += r.wpm;
      min_wpm = Math.min(min_wpm, r.wpm);
      max_wpm = Math.max(max_wpm, r.wpm);
      total_letters += r.wpm * (60 / 3) * 5;
    });

    errors.forEach((e) => {
      errors_amount += e.amount_errors;
    });

    const session: Omit<Session, "id" | "user_id"> = {
      registers: regisrters,
      errors: errors,
      start_time: startTime,
      end_time: Date.now(),
      language: "es",
      min_wpm: min_wpm,
      max_wpm: max_wpm,
      average_wpm: total_wpm / regisrters.length,
      precision: (total_letters - errors_amount) / total_letters,
    };

    try {
      const data = await saveSession(session);

      if (data) window.location.href = "/stats#lastest";

      console.log("Sesión guardada:", data);
    } catch (error) {
      console.error("Error al guardar la sesión:", error);
    }

    setSession(null);
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
        endTime,
        setEndTime,
        buildSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
