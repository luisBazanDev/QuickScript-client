import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Router from "./Router";

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthContextProvider>  
  );
}

export default App;
