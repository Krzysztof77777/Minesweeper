import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

let intervalOfTimer;

const StoreProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [minesInGame, setMinesInGame] = useState(10);
  const [statusOfGame, setStatusOfGame] = useState("ingame");
  const [numberOfCells, setNumberOfCells] = useState({ row: 8, column: 8 });

  useEffect(() => {
    newGame(8, 8, 10);
  }, []);

  const newGame = (
    row = numberOfCells.row,
    column = numberOfCells.column,
    mines = minesInGame
  ) => {
    document.documentElement.style.setProperty("--cells-in-row", row);
    resetGame(mines);
    setNumberOfCells({
      row: row,
      column: column,
    });
    setMinesInGame(mines);
    createNewTableOfCells(row, column, mines);
    intervalOfTimer = setInterval(runTimer, 1000);
  };

  const resetGame = (mines) => {
    stopTimer();
    setTimer(0);
    setCounter(mines);
    setStatusOfGame("ingame");
  };

  const runTimer = () => {
    setTimer((prevValue) => {
      if (prevValue < 999) {
        return prevValue + 1;
      } else {
        clearInterval(intervalOfTimer);
        return prevValue;
      }
    });
  };

  const stopTimer = () => {
    clearInterval(intervalOfTimer);
  };

  const createNewTableOfCells = (ROW, COLUMN, MINES) => {
    let state = [];
    let id = 0;

    for (var column = 1; column <= COLUMN; column++) {
      for (var row = 1; row <= ROW; row++) {
        state.push({
          id: id,
          y: column,
          x: row,
          isMine: false,
          isExposed: false,
          isFlagged: false,
          adjacentMines: false,
        });
        id++;
      }
    }

    drawMinesForTableOfCells(state, ROW, COLUMN, MINES);
  };

  const drawMinesForTableOfCells = (STATE, ROW, COLUMN, MINES) => {
    let mines = MINES;
    let state = STATE;

    while (mines) {
      const row = Math.floor(Math.random() * ROW + 1);
      const column = Math.floor(Math.random() * COLUMN + 1);

      state.filter((element) => {
        if (element.x === row && element.y === column) {
          if (!element.isMine) {
            element.isMine = true;
            mines--;
          }

          return element;
        } else return element;
      });
    }

    setState(state);
  };

  const checkWinGame = () => {
    let revealedCells = 0;

    for (const el of state) {
      if (el.isExposed && !el.isMine) {
        revealedCells++;
      }
    }

    if (
      revealedCells ===
      numberOfCells.row * numberOfCells.column - minesInGame
    ) {
      setStatusOfGame("wongame");
      stopTimer();
    }
  };

  const flagCell = (X, Y, isFlagged) => {
    if (!isFlagged && counter) {
      setCounter((prevValue) => {
        return prevValue - 1;
      });
      addFlagForCell(X, Y);
    } else if (isFlagged) {
      setCounter((prevValue) => {
        return prevValue + 1;
      });
      removeFlagForCell(X, Y);
    }
  };

  const addFlagForCell = (x, y) => {
    let STATE = state.filter((e) => {
      if (e.x === x && e.y === y) {
        e.isFlagged = true;
      }

      return e;
    });

    setState(STATE);
  };

  const removeFlagForCell = (x, y) => {
    let STATE = state.filter((e) => {
      if (e.x === x && e.y === y) {
        e.isFlagged = false;
      }

      return e;
    });

    setState(STATE);
  };

  const revealCell = (X, Y) => {
    let mines = checkMinesNerby(X, Y);

    let STATE = state.filter((e) => {
      if (e.x === X && e.y === Y) {
        e.isExposed = true;
        e.adjacentMines = mines;

        if (e.isMine) {
          setStatusOfGame("lostgame");
          stopTimer();
        }

        if (e.isFlagged) {
          e.isFlagged = false;
          setCounter((prevValue) => {
            return prevValue + 1;
          });
        }
      }

      return e;
    });

    setState(STATE);
    checkCellsToRevealInNerby(X, Y);
    checkWinGame();
  };

  const checkMinesNerby = (X, Y) => {
    let mines = 0;

    for (let y = Y - 1; y <= Y + 1; y++) {
      for (let x = X - 1; x <= X + 1; x++) {
        for (const el of state) {
          if (el.x === x && el.y === y) {
            if (el.isMine) {
              mines++;
            }
          }
        }
      }
    }

    return mines;
  };

  const checkCellsToRevealInNerby = (X, Y) => {
    let mines = checkMinesNerby(X, Y);

    if (mines) return;
    else {
      for (let y = Y - 1; y <= Y + 1; y++) {
        for (let x = X - 1; x <= X + 1; x++) {
          if (
            x >= 1 &&
            x <= numberOfCells.row &&
            y >= 1 &&
            y <= numberOfCells.column &&
            !(x === X && y === Y)
          ) {
            for (const el of state) {
              if (el.x === x && el.y === y && !el.isExposed) {
                revealCell(x, y);
              }
            }
          }
        }
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        counter,
        timer,
        minesInGame,
        statusOfGame,
        numberOfCells,
        newGame,
        flagCell,
        revealCell,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
