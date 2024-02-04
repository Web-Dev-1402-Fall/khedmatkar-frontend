import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "../providers/authProvider";
import { ToastProvider } from "../providers/toastProvider";
import { ServiceProvider } from "../providers/serviceProvider";

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
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
          </Routes></ToastProvider></ServiceProvider></AuthProvider>
  );
}

export default App;
