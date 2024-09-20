import { Route, BrowserRouter as RouterReact, Routes } from "react-router-dom";
import { useAuth } from "./hooks/authHook";
import Game from "./pages/Game";
import Config from "./pages/Config";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { SessionProvider } from "./context/SessionContext";

function Router() {
  const { isLogged, logout } = useAuth();

  if (
    !isLogged &&
    !["/login", "/register"].includes(window.location.pathname)
  ) {
    window.location.href = "/login";
  } else {
    if (
      isLogged &&
      ["/login", "/register"].includes(window.location.pathname)
    ) {
      window.location.href = "/";
    }
  }

  if (window.location.pathname === "/logout") {
    logout();
    window.location.href = "/login";
  }

  return (
    <>
      {isLogged ? (
        <RouterReact>
          <Routes>
            <Route
              path="/"
              element={
                <SessionProvider>
                  <Game />
                </SessionProvider>
              }
            ></Route>
            <Route path="/config" element={<Config />}></Route>
            <Route path="/stats" element={<Stats />}></Route>
          </Routes>
        </RouterReact>
      ) : (
        <RouterReact>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </RouterReact>
      )}
    </>
  );
}

export default Router;
