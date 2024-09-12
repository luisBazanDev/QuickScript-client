import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {

  return(
      <Router>
        <Routes>
          <Route path="/" element={<div>Home Page :v</div>}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>

  );
}

export default App;
