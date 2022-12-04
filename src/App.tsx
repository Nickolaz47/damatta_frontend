// Components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavMenu from "./components/General/NavMenu";
import { Spinner } from "react-bootstrap";
// Hooks
import { lazy, Suspense } from "react";
import { useAuth } from "./hooks/useAuth";
// CSS
import "./App.css";

function App() {
  const auth = useAuth();

  const Login = lazy(() => import("./pages/Login/Login"));
  const Locators = lazy(() => import("./pages/Locators/Locators"));
  const Renters = lazy(() => import("./pages/Renters/Renters"));
  const Rents = lazy(() => import("./pages/Rents/Rents"));
  const Sales = lazy(() => import("./pages/Sales/Sales"));
  const Expenses = lazy(() => import("./pages/Expenses/Expenses"));
  const Finance = lazy(() => import("./pages/Finance/Finance"));
  const Historic = lazy(() => import("./pages/Historic/Historic"));

  return (
    <div>
      <BrowserRouter>
        <NavMenu />
        <div className="set_page_size">
          <Suspense fallback={<Spinner animation="border" variant="warning" />}>
            <Routes>
              <Route
                path="/"
                element={
                  auth ? <Navigate to="/locators" /> : <Navigate to="/login" />
                }
              ></Route>
              <Route
                path="/locators"
                element={auth ? <Locators /> : <Login />}
              ></Route>
              <Route
                path="/renters"
                element={auth ? <Renters /> : <Login />}
              ></Route>
              <Route
                path="/rents"
                element={auth ? <Rents /> : <Login />}
              ></Route>
              <Route
                path="/sales"
                element={auth ? <Sales /> : <Login />}
              ></Route>
              <Route
                path="/expenses"
                element={auth ? <Expenses /> : <Login />}
              ></Route>
              <Route
                path="/finance"
                element={auth ? <Finance /> : <Login />}
              ></Route>
              <Route
                path="/historic"
                element={auth ? <Historic /> : <Login />}
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
