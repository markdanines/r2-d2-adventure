const prompt = require("prompt-sync")({ sigint: true });
const Game = require("./GameLogic/Game");
const GameUtilities = require("./GameLogic/GameUtilities");

// Create the game
const myGame = new Game();

// This is the main game loop
while (!myGame.isGameOver()) {
  // Commands should be in capital
  const command = prompt("> ").trim();

  // User must type 'LAND' in order to start the game,
  // The other commands will not work until 'LAND' has been entered
  if (command === "LAND" && !myGame.coordinatesAssigned()) {
    myGame.land();
  } else if (GameUtilities.validMoveCommand(command) && myGame.isStarted()) {
    myGame.move(parseInt(command.split(" ")[1]));
  } else if (command === "REPORT" && myGame.isStarted()) {
    myGame.report();
  } else if (command === "RIGHT" && myGame.isStarted()) {
    myGame.right();
  }
}
