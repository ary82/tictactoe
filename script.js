const gameboard = (() => {
  let array = new Array(9);
  array.fill(undefined);
  let x_moves = [];
  let o_moves = [];

  const possible_moves = () => {
    let _posssible_moves = [];
    for (let i = 0; i < 8; i++) {
      if (typeof array[i] === "undefined") {
        _posssible_moves.push(i);
      }
    }
    return _posssible_moves;
  };
  const clear = () => {
    array.fill(undefined);
    game_controller.player1.moves = [];
    game_controller.player2.moves = [];
  };
  const win_situations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { x_moves, o_moves, array, possible_moves, clear };
})();

const player = (sign) => {
  const get_sign = () => sign;
  const moves = [];
  const play_turn = (index) => {
    if (
      (game_controller.current_turn === get_sign()) &&
      gameboard.possible_moves().includes(index)
    ) {
      moves.push(index);
      gameboard.array[index] = get_sign();
      game_controller.current_turn = "x" ? "o" : "x";
    }
  };
  return { get_sign, play_turn, moves };
};

const game_controller = (() => {
  const player1 = player("x");
  const player2 = player("o");
  let current_turn = "x";
  const check_win = () => {
  };
  const check_draw = () => {
  };
  return { player1, player2, current_turn };
})();

console.log(gameboard.possible_moves());
game_controller.player1.play_turn(3);
console.log(gameboard.possible_moves());
console.log(game_controller.player1.moves);
console.log(game_controller.current_turn)
