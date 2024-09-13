import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/atoms/logo';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useDataContext } from '../context/Data';

const Stats: React.FC = () => {
    const { data, loading, extra } = useDataContext();
  
    return (
      <div className="min-h-screen h-screen overflow-hidden flex flex-col items-center bg-quickscript_dark_gray">
        <header className="w-full flex justify-between items-center p-4">
          <Logo logoType='secondary'/>
          <FontAwesomeIcon icon={faGear} className="h-4 w-4 text-quickscript_light_gray" />
        </header>
        <main className="flex flex-col items-center w-full flex-1 p-4">
          <div className="w-full max-w-3xl p-4 rounded-md shadow-md mb-4 bg-quickscript_gray">
            {loading ? (
              <p className="text-quickscript_light_gray">Cargando datos...</p>
            ) : (
              <ScatterChart
                width={600}
                height={300}
                series={[
                  {
                    label: 'WPM vs Avg Time',
                    data: data.map((v) => ({ x: v.wpm, y: v.avg_time, id: v.id })),
                  },
                  {
                    label: 'WPM vs Total Words',
                    data: data.map((v) => ({ x: v.wpm, y: v.total_words, id: v.id })),
                  },
                  {
                    label: 'WPM vs Avg Error',
                    data: data.map((v) => ({ x: v.wpm, y: v.avg_error, id: v.id })),
                  },
                ]}
              />
            )}
          </div>
        </main>
      </div>
    );
};

export default Stats;