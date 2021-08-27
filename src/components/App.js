import React from "react";

import "./AppStyles.scss";

import StoreProvider from "../store/StoreProvider";

import HeaderMineSweeperComponent from "./HeaderMineSweeperComponent";

function App() {
  return (
    <StoreProvider>
      <main className="game">
        <HeaderMineSweeperComponent></HeaderMineSweeperComponent>
      </main>
    </StoreProvider>
  );
}

export default App;
