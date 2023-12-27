import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "../providers/authProvider";

function App() {
  return (
    <AuthProvider>
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
      </Routes></AuthProvider>
  );
}

export default App;
