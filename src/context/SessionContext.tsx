import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/authHook';
import { SessionContextType, Session } from '../types'

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { token } = useAuth();

  const getSessions = async (limit: number = 10) => {
    if (!token) return;

    try {
      const response = await axios.get('/api/v1/session/get', {
        headers: { 'x-access-token': token },
        params: { limit },
      });
      setSessions(response.data);
    } catch (error) {
      console.error('Error al obtener sesiones:', error);
    }
  };

  const saveSession = async (sessionData: Omit<Session, 'id'>) => {
    if (!token) return;

    try {
      await axios.post('/api/v1/session/save', sessionData, {
        headers: { 'x-access-token': token },
      });
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
    }
  };

  return (
    <SessionContext.Provider value={{ sessions, getSessions, saveSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession debe usarse dentro de un SessionProvider');
  }
  return context;
};