import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "../providers/authProvider";
import { ToastProvider } from "../providers/toastProvider";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <route.layout>
                    <route.component />
                  </route.layout>
                }
              />
            );
          })}
        </Routes></ToastProvider></AuthProvider>
  );
}

export default App;
