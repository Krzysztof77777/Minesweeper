import React, { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";

const PanelMineSweeperComponent = () => {
  const { newGame } = useContext(StoreContext);

  return (
    <article className="game__panel panel border border--convex">
      <header className="panel__header">
        <h1 className="panel__heading">Select Difficulty</h1>
      </header>
      <section className="panel__buttons">
        <button className="button" onClick={() => newGame(8, 8, 10)}>
          Easy
        </button>
        <button className="button" onClick={() => newGame(16, 16, 40)}>
          Medium
        </button>
        <button className="button" onClick={() => newGame(30, 16, 99)}>
          Expert
        </button>
      </section>
    </article>
  );
};

export default PanelMineSweeperComponent;
