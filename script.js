"use strict";

//variables
let winner = "";
let player1Color;
let player2Color;
let player1, player2;
let currentPlayer;
let countSelectedBlocks;
let gameWinBlocks = ["159", "357", "147", "123", "369", "789", "258", "456"];

//query selectors
const selectionButton = document.querySelectorAll(".selection-btn");
const alertTile = document.querySelector(".alert-tile");
const alertOverlay = document.querySelector(".alert-overlay");
const playerColorSelectDiv = document.querySelector(".player-color-select-div");
const playerCheckDiv = document.querySelector(".player-check-div");
const container = document.querySelector(".container");
const xselectBtn = document.querySelector(".x-select-btn");
const oselectBtn = document.querySelector(".o-select-btn");
const changeModeBtn = document.querySelector("#mode-btn");

//color the winning blocks
const colorWinBlocks = function (pos1, pos2, pos3) {
  document.getElementById(`select-${pos1}`).classList.add("win-color");
  document.getElementById(`select-${pos2}`).classList.add("win-color");
  document.getElementById(`select-${pos3}`).classList.add("win-color");
};

//set player color
const initializeAll = () => {
  xselectBtn.addEventListener("click", () => {
    player1 = "X";
    player2 = "O";
    player1Color = "darkorange";
    player2Color = "darkorchid";
    currentPlayer = player1;
    document.querySelector(
      `.${player1}-div`
    ).textContent = `${player1} is Player 1`;
    document.querySelector(
      `.${player2}-div`
    ).textContent = `${player2} is Player 2`;
    playerColorSelectDiv.classList.add("hidden");
    container.classList.remove("hidden");
    playerCheckDiv.classList.remove("hidden");
    setActivePlayer(player1, player2);
  });

  oselectBtn.addEventListener("click", () => {
    player1 = "O";
    player2 = "X";
    player1Color = "darkorchid";
    player2Color = "darkorange";
    currentPlayer = player1;
    document.querySelector(
      `.${player1}-div`
    ).textContent = `${player1} is Player 1`;
    document.querySelector(
      `.${player2}-div`
    ).textContent = `${player2} is Player 2`;
    playerColorSelectDiv.classList.add("hidden");
    container.classList.remove("hidden");
    playerCheckDiv.classList.remove("hidden");
    setActivePlayer(player1, player2);
  });
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
      checkWinPositions(temp.charAt(0), temp.charAt(1), temp.charAt(2), "O")
    ) {
      // console.log(document.getElementById(`select-${temp.charAt(0)}`));
      // document.querySelector(".block-div").classList.add("hidden");

      winner = "O";
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
  document.querySelector(`.${current}-div`).classList.add("active");
  document.querySelector(`.${previous}-div`).classList.remove("active");
};

//change the current player
const changePlayer = function (current) {
  let previous;
  if (current === player1) {
    // console.log(`changing ${player1} to ${player2}`);
    currentPlayer = player2;
    previous = player1;
  } else if (current === player2) {
    // console.log(`changing ${player2} to ${player1}`);
    currentPlayer = player1;
    previous = player2;
  }

  //set active player
  setActivePlayer(currentPlayer, previous);
};

//set color of boxes of both players
const getPlayerColor = (player) => {
  //if player is 0
  if (player === player1) return player1Color;
  // if player is X
  else if (player === player2) return player2Color;
};

//set visuals of selected selection button
const setSelectedVisuals = (selectedBtnNumber, currentPlayer) => {
  selectionButton[selectedBtnNumber].textContent = currentPlayer;
  selectionButton[selectedBtnNumber].style.backgroundColor =
    getPlayerColor(currentPlayer);
  selectionButton[selectedBtnNumber].style.color = "white";
};

//set visuals of winner
const setWinnerVisuals = (winner) => {
  alertTile.textContent = `Player ${winner} wins`;
  alertTile.classList.remove("hidden");
  alertTile.classList.add("win-tile");
  alertTile.style.backgroundColor = getPlayerColor(winner);
  alertTile.style.border = `1px solid ${getPlayerColor(winner)}`;
  alertTile.style.color = "white";
  alertOverlay.classList.remove("hidden");
  countSelectedBlocks = 0;
};

//when game over
const setGameOverVisuals = () => {
  document.querySelector(".alert-tile").textContent = "Game Over";
  document.querySelector(".alert-overlay").classList.remove("hidden");
  document.querySelector(".alert-tile").classList.remove("hidden");
  alertTile.style.color = "wheat";
  alertTile.style.backgroundColor = "brown";
  alertTile.style.border = "1px solid red";
  countSelectedBlocks = 0;
};

//game starting function
const startGame = function () {
  countSelectedBlocks = 0;

  //initialize primary variables
  initializeAll();

  //if specific selection button clicked then
  for (let i = 0; i < selectionButton.length; i++) {
    selectionButton[i].addEventListener("click", function () {
      setSelectedVisuals(i, currentPlayer);
      selectionButton[i].disabled = true;
      selectionButton[i].classList.add("selection-done");
      console.log(currentPlayer);
      changePlayer(currentPlayer);
      checkGameLogic();
      countSelectedBlocks++;

      //if winner is present
      if (winner) {
        //set winner visuals
        setWinnerVisuals(winner);
      }

      //if all selections done and no winner is there
      if (countSelectedBlocks === 9 && winner === "") {
        //set game over visuals
        setGameOverVisuals();
      }
    });
  }
};

//resetting the game function
const resetGame = function () {
  //hide alert overlay
  document.querySelector(".alert-overlay").classList.add("hidden");
  document.querySelector(".alert-tile").classList.add("hidden");

  //reset all selections
  for (let i = 0; i < selectionButton.length; i++) {
    selectionButton[i].disabled = false;
    selectionButton[i].textContent = "select";
    selectionButton[i].classList.remove("selection-done");
    selectionButton[i].classList.remove("win-color");
    selectionButton[i].style.backgroundColor = "lightblue";
    selectionButton[i].style.color = "darkblue";
  }

  //set current player as active player
  document.querySelector(`.${currentPlayer}-div`).classList.add("active");

  //check if winner is there
  if (winner !== "")
    document.querySelector(`.${winner}-div`).classList.remove("active");

  //make winner empty
  winner = "";

  //make count of already selected blocks to 0
  countSelectedBlocks = 0;
};

//start the game
startGame();
