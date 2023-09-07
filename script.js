let gameboard = (() => {
  let array = new Array(9);
  array.fill(undefined);
  const clear_board = () => {
    array.fill(undefined);
  };
  const checkwin = (xoro) => {
    let temparr = [];
    for (let i = 0; i < 9; i++) {
      if (array[i] === xoro) {
        temparr.push(i);
        console.log(temparr);
        if (
          (temparr.includes(0) && temparr.includes(1) && temparr.includes(2)) ||
          (temparr.includes(3) && temparr.includes(4) && temparr.includes(5)) ||
          (temparr.includes(6) && temparr.includes(7) && temparr.includes(8)) ||
          (temparr.includes(0) && temparr.includes(3) && temparr.includes(6)) ||
          (temparr.includes(1) && temparr.includes(4) && temparr.includes(7)) ||
          (temparr.includes(2) && temparr.includes(5) && temparr.includes(8)) ||
          (temparr.includes(0) && temparr.includes(4) && temparr.includes(8)) ||
          (temparr.includes(2) && temparr.includes(4) && temparr.includes(6))
        ) {
          console.log(xoro + " wins");
          break;
        }
      }
    }
  };
  return { array, clear_board, checkwin };
})();
let player = (xoro) => {
  const get_xoro = () => xoro;
  const playturn = (index) => {
    gameboard.array[index] = xoro;
    gameboard.checkwin(xoro);
  };
  return { get_xoro, playturn };
};

let player1 = player("x");
let comp = player("o");
player1.playturn(2);
player1.playturn(0);
player1.playturn(1);
comp.playturn(7);
comp.playturn(8);
comp.playturn(6);
console.log(gameboard.array);
if (gameboard.array[2]) {
  console.log("yay");
}
