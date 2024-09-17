import "./App.css";
import { AuthConextProvider } from "./context/AuthContext";
import Router from "./Router";

function App() {
  return (
    <AuthConextProvider>
      <Router />
    </AuthConextProvider>
  );
}

export default App;
