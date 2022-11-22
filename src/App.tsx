// Components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import { Spinner } from "react-bootstrap";
// Hooks
import { lazy, Suspense } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavMenu />
        <Suspense fallback={<Spinner animation="border" variant="warning" />}>
          <Routes></Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
