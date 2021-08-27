import React, { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";

const BoardMineSweeperComponent = () => {
  const { state } = useContext(StoreContext);
  const { statusOfGame } = useContext(StoreContext);
  const { flagCell } = useContext(StoreContext);
  const { revealCell } = useContext(StoreContext);

  const Elements = state.map((element) => {
    let className = "cell border";
    if (element.isExposed) className += " border--revealed";
    else className += " border--concave";
    if (element.isFlagged) className += " cell--is-flag";
    if (statusOfGame === "lostgame") {
      if (element.isMine) className += " cell--is-mine";
      if (element.isMine && !element.isExposed)
        className += " border--revealed";
    }
    if (element.adjacentMines) {
      switch (element.adjacentMines) {
        case 1:
          className += " cell-info-1";
          break;
        case 2:
          className += " cell-info-2";
          break;
        case 3:
          className += " cell-info-3";
          break;
        case 4:
          className += " cell-info-4";
          break;
        case 5:
          className += " cell-info-5";
          break;
        case 6:
          className += " cell-info-6";
          break;
        case 7:
          className += " cell-info-7";
          break;
        case 8:
          className += " cell-info-8";
          break;
        default:
          throw new Error("Something went wrong!");
      }
    }

    let onClickEvent = null;
    if (!element.isExposed && !element.isFlagged && statusOfGame === "ingame") {
      onClickEvent = () => revealCell(element.x, element.y);
    }

    let onContextMenuEvent = false;
    if (statusOfGame === "ingame" && !element.isExposed) {
      onContextMenuEvent = () =>
        flagCell(element.x, element.y, element.isFlagged);
    }

    return (
      <div
        key={element.id}
        className={className}
        data-x={element.x}
        data-y={element.y}
        onContextMenu={(event) => {
          event.preventDefault();

          onContextMenuEvent &&
            onContextMenuEvent(element.x, element.y, element.isFlagged);
        }}
        onClick={onClickEvent}
      >
        {element.adjacentMines && !element.isMine && element.isExposed
          ? element.adjacentMines
          : false}
      </div>
    );
  });

  return (
    <article className="game__board board border border--convex">
      {Elements}
    </article>
  );
};

export default BoardMineSweeperComponent;
