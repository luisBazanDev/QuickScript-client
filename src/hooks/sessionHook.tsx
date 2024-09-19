// useSession.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Session } from '../types';

export const useSession = (token: string | null) => {
  const [sessionData, setSessionData] = useState<Session[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) return;

    const fetchSessions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/session/get', {
          headers: {
            'x-access-token': token,
          },
        });
        setSessionData(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [token]);

  return { sessionData, loading };
};
