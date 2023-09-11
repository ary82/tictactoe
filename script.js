const gameboard = (() => {
  let array = new Array(9);
  array.fill(undefined);

  const possible_moves = () => {
    let _posssible_moves = [];
    for (let i = 0; i < 9; i++) {
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
  const check_win_situations = (arr) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 3; j++) {
        if (!arr.includes(win_situations[i][j])) {
          break;
        }
        if (arr.includes(win_situations[i][j]) && j === 2) {
          return true;
        }
      }
    }
    return false;
  };

  return { array, possible_moves, check_win_situations, clear };
})();

const player = (sign) => {
  const get_sign = () => sign;
  const moves = [];
  const play_turn = (index) => {
    if (
      (game_controller.current_turn === get_sign()) &&
      gameboard.possible_moves().includes(index) &&
      game_controller.check_running()
    ) {
      moves.push(index);
      gameboard.array[index] = get_sign();
      game_controller.current_turn = (sign === "x") ? "o" : "x";
      game_controller.check_win(sign);
      game_controller.check_draw();
    }
  };
  const computer_logic = () => {
    let index = "undefined";
    const minimax = (board, is_maximising) => {
      if (game_controller.check_win("o")) {
        return 10;
      } else if (game_controller.check_win("x")) {
        return -10;
      } else if (game_controller.check_draw()) {
        return 0;
      }

      if (is_maximising) {
        let bestVal = -1000;
        for (let i = 0; i < gameboard.possible_moves().length; i++) {
          gameboard.array[i] = "o";
          bestVal = Math.max(bestVal, minimax(gameboard.array, false));
        }
        return bestVal;
      } else {
        let bestVal = 1000;
        for (let i = 0; i < gameboard.possible_moves().length; i++) {
          gameboard.array[i] = "x";
          bestVal = Math.min(bestVal, minimax(gameboard.array, false));
        }
        return bestVal;
      }
    };
    return index;
  };
  return { get_sign, play_turn, moves, computer_logic };
};

const game_controller = (() => {
  const player1 = player("x");
  const player2 = player("o");
  let _running = true;
  let current_turn = "x";
  const check_running = () => _running;
  const check_win = (sign) => {
    if (!check_running()) {
      return false;
    }
    if (sign === player1.get_sign()) {
      if (gameboard.check_win_situations(player1.moves)) {
        _running = false;
        console.log(sign + " wins");
        return true;
      }
    } else {
      if (gameboard.check_win_situations(player2.moves)) {
        _running = false;
        console.log(sign + " wins");
        return true;
      }
    }
    return false;
  };
  const check_draw = () => {
    if (!check_running()) {
      return false;
    }
    if (!gameboard.possible_moves().length) {
      _running = false;
      console.log("Drawww");
      return true;
    }
    return false;
  };
  return {
    player1,
    player2,
    current_turn,
    check_running,
    check_win,
    check_draw,
  };
})();

console.log(gameboard.possible_moves());
game_controller.player1.play_turn(0);
game_controller.player2.play_turn(1);
game_controller.player1.play_turn(2);
game_controller.player2.play_turn(4);
game_controller.player1.play_turn(3);
game_controller.player2.play_turn(5);
game_controller.player1.play_turn(7);
game_controller.player2.play_turn(6);
game_controller.player1.play_turn(8);
console.log(gameboard.array);
