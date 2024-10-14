import React from "react";
import PageRoutes from "./PageRoutes";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./redux/store";

function App() {
  return (
    <Provider store={store} redirectUri={window.location.origin}>
      <Toaster />
      <PageRoutes />
    </Provider>
  );
}

export default App;
