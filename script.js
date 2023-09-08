let gameboard = (() => {
  let array = new Array(9);
  array.fill(undefined);
  let gameover = false;
  const clear_board = () => {
    array.fill(undefined);
  };
  const checkwin = (xoro) => {
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
          (_temparr.includes(2) && _temparr.includes(4) && _temparr.includes(6))
        ) {
          console.log(xoro + " wins");
          gameover = true;
          break;
        }
      }
    }
  };
  return { array, gameover, clear_board, checkwin };
})();
let player = (xoro) => {
  const get_xoro = () => xoro;
  const playturn = (index) => {
    console.log(gameboard.gameover);
    if (
      (typeof gameboard.array[index] === "undefined") && (!gameboard.gameover)
    ) {
      gameboard.array[index] = xoro;
      gameboard.checkwin(xoro);
    }
  };
  return { get_xoro, playturn };
};

let player1 = player("x");
let comp = player("o");
player1.playturn(2);
console.log(gameboard.gameover);
player1.playturn(0);
player1.playturn(1);
console.log(gameboard.gameover);
comp.playturn(7);
comp.playturn(8);
comp.playturn(6);
console.log(gameboard.array);
console.log(gameboard.gameover);
