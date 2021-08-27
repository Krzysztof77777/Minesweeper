import React, { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";

const HeaderMineSweeperComponent = () => {
  const { counter } = useContext(StoreContext);
  const { timer } = useContext(StoreContext);
  const { statusOfGame } = useContext(StoreContext);
  const { newGame } = useContext(StoreContext);

  const checkStatusOfGame = () => {
    if (statusOfGame === "ingame") {
      return <img src="assets/neutral.svg"></img>;
    } else if (statusOfGame === "wongame") {
      return <img src="assets/positive.svg"></img>;
    } else {
      return <img src="assets/negative.svg"></img>;
    }
  };

  return (
    <header className="game__header header border border--convex">
      <article className="header__counter">{counter}</article>
      <button
        className="header__button border border--concave"
        onClick={() => newGame()}
      >
        {checkStatusOfGame()}
      </button>
      <article className="header__counter">{timer}</article>
    </header>
  );
};

export default HeaderMineSweeperComponent;
