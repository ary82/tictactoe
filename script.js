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
  const terminate_game = () => {
    if (_gameover) {
      return true;
    } else {
      return false;
    }
  };
  return { terminate_game, array, clear_board, checkwin, checkdraw };
})();

let player = (xoro) => {
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
