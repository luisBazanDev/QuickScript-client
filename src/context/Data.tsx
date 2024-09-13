import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface DataPoint {
  id: number;
  wpm: number;
  avg_time: number;
  total_words: number;
  avg_error: number;
  prefered_lang: number;
}

interface DataContextType {
  data: DataPoint[];
  loading: boolean;
  extra: boolean;
  setExtra: (value: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [extra, setExtra] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await new Promise<DataPoint[]>((resolve) =>
          setTimeout(() => resolve([
            { id: 1, wpm: 70.5, avg_time: 5000, total_words: 100, avg_error: 2, prefered_lang: 1 },
            { id: 2, wpm: 80.3, avg_time: 4000, total_words: 150, avg_error: 1, prefered_lang: 2 },
          ]), 1000)
        );
        setData(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, extra, setExtra }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};