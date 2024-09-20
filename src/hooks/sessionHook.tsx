import { useContext, useEffect, useRef } from "react";
import SessionContext from "../context/SessionContext";

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  const {
    start,
    text,
    session,
    addError,
    addRegister,
    startTime,
    duration,
    setEndTime,
    endTime,
    buildSession,
  } = context;

  const restart = () => {
    window.location.reload();
  };

  const finish = () => {
    setEndTime(Date.now());

    buildSession();
  };

  return {
    start,
    text,
    session,
    restart,
    addError,
    addRegister,
    startTime,
    duration,
    finish,
    buildSession,
    is_finished: !!endTime,
  };
};
