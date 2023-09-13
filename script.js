// Gameboard Module
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

  const _win_situations = [
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
        if (!arr.includes(_win_situations[i][j])) {
          break;
        }
        if (arr.includes(_win_situations[i][j]) && j === 2) {
          return true;
        }
      }
    }
    return false;
  };

  return { array, possible_moves, check_win_situations };
})();

// Player factory function
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
      game_controller.check_win(get_sign());
      game_controller.check_draw();
      display_controller.display_on_grid();
    }
  };

  const random_allowed_move = () => {
    let _index = Math.floor(Math.random() * gameboard.possible_moves().length);
    return gameboard.possible_moves()[_index];
  };

  return {
    get_sign,
    play_turn,
    moves,
    random_allowed_move,
  };
};

// Game Controller Module
const game_controller = (() => {
  const player1 = player("x");
  const player2 = player("o");
  let _running = true;
  let current_turn = "x";

  const check_running = () => _running;

  const check_win = (sign) => {
    if (sign === player1.get_sign()) {
      if (gameboard.check_win_situations(player1.moves)) {
        _running = false;
        display_controller.display_status(player1.get_sign(), true);
        return true;
      }
    } else {
      if (gameboard.check_win_situations(player2.moves)) {
        _running = false;
        display_controller.display_status(player2.get_sign(), true);
        return true;
      }
    }
    return false;
  };

  const check_draw = () => {
    if (_running) {
      if (!gameboard.possible_moves().length) {
        _running = false;
        display_controller.display_status("x", false);
        return true;
      }
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

// Display Controller Module
const display_controller = (() => {
  // Declare DOM constants
  const ttt_html = document.querySelectorAll("#game_board > div");
  const comp_button = document.getElementById("computer");
  const pl2_button = document.getElementById("player2");
  const o_btn = document.getElementById("o");
  const x_btn = document.getElementById("x");

  // Set sessionStorage if it does not exist
  if (!sessionStorage.getItem("selected_sign")) {
    sessionStorage.setItem("selected_sign", JSON.stringify("x"));
  }

  // Update checked buttons from sessionStorage if available
  if (sessionStorage.getItem("opponent") === '"computer"') {
    comp_button.checked = true;
  } else if (sessionStorage.getItem("opponent") === '"player2"') {
    pl2_button.checked = true;
  }
  if (sessionStorage.getItem("selected_sign") === '"x"') {
    x_btn.checked = true;
  } else if (sessionStorage.getItem("selected_sign") === '"o"') {
    o_btn.checked = true;
  }

  // Event Listener for updating sessionStorage
  comp_button.addEventListener("input", () => {
    sessionStorage.setItem("opponent", JSON.stringify(comp_button.id));
    document.location.reload();
  });
  pl2_button.addEventListener("input", () => {
    sessionStorage.setItem("opponent", JSON.stringify(pl2_button.id));
    document.location.reload();
  });
  x_btn.addEventListener("input", () => {
    sessionStorage.setItem("selected_sign", JSON.stringify(x_btn.id));
    document.location.reload();
  });
  o_btn.addEventListener("input", () => {
    sessionStorage.setItem("selected_sign", JSON.stringify(o_btn.id));
    document.location.reload();
  });

  // Grid Event Listener
  ttt_html.forEach((element) => {
    element.addEventListener("click", () => {
      if (comp_button.checked && !o_btn.checked) {
        game_controller.player1.play_turn(parseInt(element.dataset.board));
        game_controller.player2.play_turn(
          game_controller.player2.random_allowed_move(),
        );
      } else if (comp_button.checked && o_btn.checked) {
        game_controller.player2.play_turn(parseInt(element.dataset.board));
        game_controller.player1.play_turn(
          game_controller.player1.random_allowed_move(),
        );
      } else {
        game_controller.player1.play_turn(parseInt(element.dataset.board));
        game_controller.player2.play_turn(parseInt(element.dataset.board));
      }
    });
  });

  // Restart Button Event Listener
  document.querySelector("button").addEventListener("click", () => {
    document.location.reload();
  });

  // Status Line display function
  const display_status = (sign, does_winner_exist) => {
    const status = document.getElementById("status");
    if (does_winner_exist) {
      if (JSON.parse(sessionStorage.getItem("selected_sign")) == sign) {
        status.classList.add("win");
        status.innerText = `${sign}`.toUpperCase() + " wins! Congratulations!";
      } else {
        status.classList.add("lose");
        status.innerText = "Oh no! " + `${sign}`.toUpperCase() + " wins!";
      }
    } else {
      status.classList.add("draw");
      status.innerText = "It's a draw!";
    }
  };

  // Function for displaying the Game
  const display_on_grid = () => {
    ttt_html.forEach((element) => {
      element.innerText = "";
    });
    const x_sign_existing = document.querySelector(
      '#select_sign > label[for="x"] > svg',
    );
    const o_sign_existing = document.querySelector(
      '#select_sign > label[for="o"] > svg',
    );
    for (let i = 0; i < gameboard.array.length; i++) {
      if (gameboard.array[i] == "x") {
        let x_sign = x_sign_existing.cloneNode(true);
        document.querySelector(`[data-board="${i}"]`)
          .appendChild(
            x_sign,
          );
      } else if (gameboard.array[i] == "o") {
        let o_sign = o_sign_existing.cloneNode(true);
        document.querySelector(`[data-board="${i}"]`)
          .appendChild(
            o_sign,
          );
      }
    }
  };
  return { display_on_grid, display_status };
})();
