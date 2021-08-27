import React from "react";

import "./AppStyles.scss";

import StoreProvider from "../store/StoreProvider";

import HeaderMineSweeperComponent from "./HeaderMineSweeperComponent";
import BoardMineSweeperComponent from "./BoardMineSweeperComponent";
import PanelMineSweeperComponent from "./PanelMineSweeperComponent";

function App() {
  return (
    <StoreProvider>
      <main className="game">
        <HeaderMineSweeperComponent></HeaderMineSweeperComponent>
        <BoardMineSweeperComponent></BoardMineSweeperComponent>
        <PanelMineSweeperComponent></PanelMineSweeperComponent>
      </main>
    </StoreProvider>
  );
}

export default App;
