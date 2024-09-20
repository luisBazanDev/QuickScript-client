import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { sampleSession } from '../const/sampleData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/atoms/logo';

const Stats: React.FC = () => {
  const data = sampleSession.registers.map((register, index) => ({
    name: (index + 1).toString(),
    wpm: register.wpm,
    errors: sampleSession.errors.find(error => error.time === register.time)?.amount_errors || 0,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg-color">
      <header className="w-full flex justify-between items-center p-4">
        <a href="/"><Logo logoType='secondary' /></a>
        <a href="/Config"><FontAwesomeIcon icon={faGear} className="h-4 w-4 text-icon-color" /></a>
      </header>
      <main className="flex flex-col items-center w-full flex-1 p-4">
        <div className="w-full max-w-5xl p-4 mb-4 bg-bg-color flex flex-row">
          <div className="w-1/2 flex flex-col items-start p-4">
            <div className="text-left font-bold text-logo-color">
              <p className="text-2xl">User</p>
            </div>
            <div className="mt-2 text-left font-bold text-logo-color">
              <p className="text-xl text-text-color">Min WPM: {sampleSession.min_wpm}</p>
              <p className="text-xl text-text-color">Max WPM: {sampleSession.max_wpm}</p>
            </div>
          </div>
          <div className="flex flex-row items-start p-4">
            <div className="text-left font-bold text-logo-color mr-4">
              <p className="text-2xl">WPM</p>
              <p className="text-5xl font-bold text-text-color">{sampleSession.average_wpm}</p>
              <p className="text-2xl mt-4">Acc</p>
              <p className="text-5xl font-bold text-text-color">{sampleSession.precision}%</p>
              <p className="text-logo-color font-bold text-xl mt-4">Test Type</p>
              <p className="text-text-color font-bold text-xg">Time: {sampleSession.registers[0].time}</p>
              <p className="text-text-color font-bold text-xg">{sampleSession.language.display_name}</p>
            </div>
            <div className="mt-4">
              <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
                <Line type="monotone" dataKey="errors" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;