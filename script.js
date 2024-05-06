"use strict";

let currentPlayer = "0";
let winner = "";
let gameWinBlocks = ["159", "357", "147", "123", "369", "789", "258", "456"];
const selectionButton = document.querySelectorAll(".selection-btn");
let countSelectedBlocks;

//color the winning blocks
const colorWinBlocks = function (pos1, pos2, pos3) {
  document.getElementById(`select-${pos1}`).classList.add("win-color");
  document.getElementById(`select-${pos2}`).classList.add("win-color");
  document.getElementById(`select-${pos3}`).classList.add("win-color");
};

//check for winning positions
const checkWinPositions = function (pos1, pos2, pos3, player) {
  if (
    document.getElementById(`select-${pos1}`).textContent ===
      document.getElementById(`select-${pos2}`).textContent &&
    document.getElementById(`select-${pos2}`).textContent ===
      document.getElementById(`select-${pos3}`).textContent &&
    document.getElementById(`select-${pos3}`).textContent ===
      document.getElementById(`select-${pos1}`).textContent &&
    document.getElementById(`select-${pos1}`).textContent === player
  ) {
    return true;
  } else {
    return false;
  }
};

//check for winner
const checkGameLogic = function () {
  for (let i = 0; i < gameWinBlocks.length; i++) {
    // console.log(document.getElementById(`select-${1}`));
    const temp = gameWinBlocks[i];
    if (
      checkWinPositions(temp.charAt(0), temp.charAt(1), temp.charAt(2), "0")
    ) {
      // console.log(document.getElementById(`select-${temp.charAt(0)}`));
      // document.querySelector(".block-div").classList.add("hidden");

      winner = "0";
      colorWinBlocks(temp.charAt(0), temp.charAt(1), temp.charAt(2));
    } else if (
      checkWinPositions(temp.charAt(0), temp.charAt(1), temp.charAt(2), "X")
    ) {
      winner = "X";
      colorWinBlocks(temp.charAt(0), temp.charAt(1), temp.charAt(2));
    }
  }
};

//set current player visuals
const setActivePlayer = function (current, previous) {
  document
    .querySelector(`.player-${Number(current)}-div`)
    .classList.add("active");

  document
    .querySelector(`.player-${Number(current)}-div`)
    .classList.remove("hidden");

  document
    .querySelector(`.player-${Number(previous)}-div`)
    .classList.remove("active");
  document
    .querySelector(`.player-${Number(previous)}-div`)
    .classList.add("hidden");
};

//change the current player
const changePlayer = function (current) {
  let previous;
  if (current === "0") {
    console.log("change to player 1");
    currentPlayer = "1";
    previous = "0";
  } else if (current === "1") {
    console.log("change to player 0");
    currentPlayer = "0";
    previous = "1";
  }

  setActivePlayer(currentPlayer, previous);
};

//game starting function
const startGame = function () {
  countSelectedBlocks = 0;
  for (let i = 0; i < selectionButton.length; i++) {
    selectionButton[i].addEventListener("click", function () {
      let current = currentPlayer;
      // console.log(selectionButton[i].textContent);
      if (currentPlayer === "1") {
        selectionButton[i].textContent = "X";
      } else if (currentPlayer === "0") {
        selectionButton[i].textContent = "0";
      }
      selectionButton[i].disabled = true;
      selectionButton[i].classList.add("selection-done");
      changePlayer(current);
      checkGameLogic();
      countSelectedBlocks++;

      if (winner) {
        document.querySelector(
          ".alert-tile"
        ).textContent = `Player ${winner} wins`;
        document.querySelector(".alert-overlay").classList.remove("hidden");
        document.querySelector(".alert-tile").classList.remove("hidden");
        countSelectedBlocks = 0;
        document.querySelector(".alert-tile").classList.add("win-tile");
      }

      if (countSelectedBlocks === 9 && winner === "") {
        document.querySelector(".alert-tile").textContent = "Game Over";
        document.querySelector(".alert-overlay").classList.remove("hidden");
        document.querySelector(".alert-tile").classList.remove("hidden");
        document.querySelector(".alert-tile").classList.remove("win-tile");
        countSelectedBlocks = 0;
      }
    });
  }
};

//resetting the game function
const resetGame = function () {
  document.querySelector(".alert-overlay").classList.add("hidden");
  document.querySelector(".alert-tile").classList.add("hidden");
  for (let i = 0; i < selectionButton.length; i++) {
    selectionButton[i].disabled = false;
    selectionButton[i].textContent = "select";
    selectionButton[i].classList.remove("selection-done");
    selectionButton[i].classList.remove("win-color");
  }

  document
    .querySelector(`.player-${currentPlayer}-div`)
    .classList.add("active");

  if (winner !== "")
    document
      .querySelector(`.player-${winner === "X" ? "1" : "0"}-div`)
      .classList.remove("active");

  winner = "";
  countSelectedBlocks = 0;
};

//start the game
startGame();
