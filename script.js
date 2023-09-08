let gameboard = (() => {
  let array = new Array(9);
  array.fill(undefined);
  let _gameover = false;
  const clear_board = () => {
    array.fill(undefined);
    _gameover = false;
  };
  const checkwin = (xoro) => {
    if (!_gameover) {
      let _temparr = [];
      for (let i = 0; i < 9; i++) {
        if (array[i] === xoro) {
          _temparr.push(i);
          if (
            (_temparr.includes(0) && _temparr.includes(1) &&
              _temparr.includes(2)) ||
            (_temparr.includes(3) && _temparr.includes(4) &&
              _temparr.includes(5)) ||
            (_temparr.includes(6) && _temparr.includes(7) &&
              _temparr.includes(8)) ||
            (_temparr.includes(0) && _temparr.includes(3) &&
              _temparr.includes(6)) ||
            (_temparr.includes(1) && _temparr.includes(4) &&
              _temparr.includes(7)) ||
            (_temparr.includes(2) && _temparr.includes(5) &&
              _temparr.includes(8)) ||
            (_temparr.includes(0) && _temparr.includes(4) &&
              _temparr.includes(8)) ||
            (_temparr.includes(2) && _temparr.includes(4) &&
              _temparr.includes(6))
          ) {
            _gameover = true;
            console.log(xoro + " wins");
            break;
          }
        }
      }
    }
  };
  const checkdraw = () => {
    if (!_gameover) {
      let _tempcount = 0;
      for (let i = 0; i < 9; i++) {
        if (typeof array[i] == "undefined") {
          _tempcount++;
        }
      }
      if (!_tempcount) {
        _gameover = true;
        console.log("draw " + _gameover);
      }
    }
  };
  const terminate_game = () => _gameover;
  return { terminate_game, array, clear_board, checkwin, checkdraw };
})();

const player = (xoro) => {
  const get_xoro = () => xoro;
  const playturn = (index) => {
    if (
      (typeof gameboard.array[index] === "undefined") &&
      (!gameboard.terminate_game())
    ) {
      gameboard.array[index] = xoro;
      gameboard.checkwin(xoro);
      gameboard.checkdraw();
    }
  };
  return { get_xoro, playturn };
};
const computer = (xoro) => {
  const { playturn } = player(xoro);
  const start = () => {
    if (turn) {
      playturn(computerMoveLogic.move());
    }
  };
  const computerMoveLogic = () => {
    let difficulty = 3;
    const optimumMove = () => {
      let _bestScore = -Infinity;
      let _bestMove;
      for (let i = 0; i < 8; i++) {
        if (typeof gameboard.array[i] === "undefined") {
          let _score = minimax(gameboard.array, i);
          if (_score > _bestScore) {
            _bestScore = _score;
            _bestMove = i;
          }
        }
      }
      return _bestMove;
    };
    const randomMove = () => {
      let _allowedMoves = [];
      for (let i = 0; i < 8; i++) {
        if (typeof gameboard.array[i] === "undefined") {
          _allowedMoves.push(i);
        }
      }
      return _allowedMoves[Math.floor(Math.random() * _allowedMoves.length)];
    };
    const move = () => {
      let _tempvar = Math.floor(Math.random() * 10);
      if (difficulty === 0) {
        return randomMove;
      } else if (difficulty === 3) {
        return optimumMove;
      } else if (difficulty === 1) {
        if (_tempvar <= 3) {
          return optimumMove;
        } else {
          return randomMove;
        }
      } else {
        if (_tempvar <= 7) {
          return optimumMove;
        } else {
          return randomMove;
        }
      }
    };
    return { move };
  };
  return { start };
};

const gamecontroller = (() => {
  let player1 = player("x");
  let player2 = player("o");

  const turnlogic = () => {
  };
  return { player1, player2, turnlogic };
})();
gamecontroller.player1.playturn(0);
gamecontroller.player1.playturn(1);
gamecontroller.player1.playturn(2);
gamecontroller.player2.playturn(6);
gamecontroller.player2.playturn(8);
console.log(gameboard.array);
