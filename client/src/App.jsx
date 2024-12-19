import React from "react";
import PageRoutes from "./PageRoutes";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store} redirectUri={window.location.origin}>
      <BrowserRouter>
        <Toaster />
        <PageRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
