document.querySelector(".app-info").textContent =
  "Last updated : 01 May, 2022 | Version : v0.5";
document.querySelector(".dev-info").textContent =
  "Developed by : PUSHKAR SHARMA";
let player1 = "";
let player2 = "";
let player1_values = "";
let player2_values = "";
let winner = "";
let winner_number = "";
let final_values = [];
let but = document.querySelectorAll(".btn");
let victory_values = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function initialSelection() {
  while (
    player1 !== "X" ||
    player1 !== "O" ||
    player1 !== "x" ||
    player1 !== "o"
  ) {
    player1 = prompt("player 1 :: enter X or O");
    if (player1 === "X" || player1 === "O") {
      break;
    }
    if (player1 === "x" || player1 === "o") {
      player1 = player1.toUpperCase();
      break;
    }
  }
  if (player1 === "X") {
    player2 = "O";
  } else {
    player2 = "X";
  }
}
function displayPlayersInfo() {
  document.querySelector(".p1").textContent = player1;
  document.querySelector(".p2").textContent = player2;
  document.querySelector(".current_turn").textContent = player1;
}

initialSelection();
displayPlayersInfo();

let current_player = player1;
let count = 0;

const checkAllPresent = (arr1, arr2) => {
  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (Number(arr1[i]) === Number(arr2[j])) {
        count++;
      }
    }
  }
  if (count === 3) {
    final_values = arr1;
    console.log(final_values);
    return true;
  } else return false;
};

function vic_check(string_val) {
  let nums = string_val.split("");
  for (let i = 0; i < victory_values.length; i++) {
    let temp = victory_values[i];
    // console.log("temp" + temp);
    // console.log("nums" + nums);
    if (checkAllPresent(nums, temp)) return true;
  }
}

function victory_color_change() {
  for (let i = 0; i < but.length; i++) {
    if (final_values.includes(but[i].value)) {
      but[i].style.backgroundColor = "green";
      but[i].style.color = "white";
      but[i].style.border = "2px solid whitesmoke";
    }
  }
}

function reloadWindow() {
  if (winner === "X") {
    victory_color_change();
    document.querySelector(".winner-display").textContent =
      winner_number + " ( " + winner + " )" + " wins...";
  } else if (winner === "O") {
    victory_color_change();
    document.querySelector(".winner-display").textContent =
      winner_number + " ( " + winner + " )" + " wins...";
  } else if (winner === "N")
    document.querySelector(".winner-display").textContent = "Match Draw!";
  document.querySelector(".overlay").style.display = "inline";
}

function game_logic() {
  for (let i = 0; i < but.length; i++) {
    but[i].addEventListener("click", function () {
      if (player1_values.length === 5 || player2_values.length === 5) {
        winner = "N";
        reloadWindow();
        return;
      }
      if (current_player === player1 && but[i].textContent === "?") {
        but[i].textContent = player1;
        current_player = player2;
        document.querySelector(".current_turn").textContent = player2;
        but[i].style.color = "darkred";
        but[i].style.border = "1px solid darkred";
        // console.log("in player1");
        player1_values = player1_values + but[i].value;
        // console.log(player1_values);
        if (player1_values.length >= 3) {
          if (vic_check(player1_values)) {
            // console.log("player1 wins");
            winner = player1;
            if (winner === player1) winner_number = "Player 1";
            else if (winner === player2) winner_number = "Player 2";
            reloadWindow();
          }
        }
      } else if (current_player === player2 && but[i].textContent === "?") {
        but[i].textContent = player2;
        current_player = player1;
        document.querySelector(".current_turn").textContent = player1;
        but[i].style.color = "darkblue";
        but[i].style.border = "1px solid darkblue";
        // console.log("in player2");
        player2_values = player2_values + but[i].value;
        // console.log(player2_values);
        if (player2_values.length >= 3) {
          if (vic_check(player2_values)) {
            // console.log("player2 wins");
            winner = player2;
            winner_number = "Player 2";
            reloadWindow();
          }
        }
      }
    });
  }
}
game_logic();

function resetGame() {
  for (let i = 0; i < but.length; i++) {
    but[i].style.backgroundColor = "beige";
    but[i].style.color = "black";
    but[i].style.border = "none";
    but[i].textContent = "?";
  }
  player1 = "";
  player2 = "";
  player1_values = "";
  player2_values = "";
  winner = "";
  winner_number = "";
  final_values = [];
  count = 0;
  document.querySelector(".overlay").style.display = "none";
  initialSelection();
  displayPlayersInfo();

  game_logic();
}
