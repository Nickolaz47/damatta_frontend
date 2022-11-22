// Components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import { Spinner } from "react-bootstrap";
// Hooks
import { lazy, Suspense } from "react";
// CSS
import "./App.css";

function App() {
  const auth = false;

  const Login = lazy(() => import("./pages/Login/Login"));
  const Locators = lazy(() => import("./pages/Locators/Locators"));
  const Renters = lazy(() => import("./pages/Renters/Renters"));
  const Rents = lazy(() => import("./pages/Renters/Renters"));
  const Sales = lazy(() => import("./pages/Sales/Sales"));

  return (
    <div>
      <BrowserRouter>
        <NavMenu />
        <div className="set_page_size">
          <Suspense fallback={<Spinner animation="border" variant="warning" />}>
            <Routes>
              <Route
                path="/locators"
                element={auth ? <Locators /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/renters"
                element={auth ? <Renters /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/rents"
                element={auth ? <Rents /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/sales"
                element={auth ? <Sales /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/login"
                element={!auth ? <Login /> : <Navigate to="/locators" />}
              ></Route>
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
