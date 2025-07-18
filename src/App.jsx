import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRouter";

function AppLG() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes"
            element={<PrivateRoute>{<Notes />}</PrivateRoute>}
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLG />
    </BrowserRouter>
  );
}
