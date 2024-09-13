import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Game from "./pages/Game";
import Config from "./pages/Config";

function App() {

  return(
      <Router>
        <Routes>
          <Route path="/" element={<div>Home Page :v</div>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/config" element={<Config />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
