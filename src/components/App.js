import React from "react";

import "./AppStyles.scss";

import StoreProvider from "../store/StoreProvider";

import HeaderMineSweeperComponent from "./HeaderMineSweeperComponent";
import BoardMineSweeperComponent from "./BoardMineSweeperComponent";

function App() {
  return (
    <StoreProvider>
      <main className="game">
        <HeaderMineSweeperComponent></HeaderMineSweeperComponent>
        <BoardMineSweeperComponent></BoardMineSweeperComponent>
      </main>
    </StoreProvider>
  );
}

export default App;
