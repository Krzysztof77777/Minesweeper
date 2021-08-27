import React from "react";

import "./AppStyles.scss";

import StoreProvider from "../store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <main className="game"></main>
    </StoreProvider>
  );
}

export default App;
