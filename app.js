const prompt = require("prompt-sync")({ sigint: true });
const isNumber = require('is-number');
const Game = require('./GameLogic/Game');

// Create the game 
const myGame = new Game();

while(!myGame.gameOver) {
    const command = prompt("> ").trim();
    if (command === 'LAND' && !myGame.coordinatesAssigned()) {
        myGame.land();
    } else if (validMoveCommand(command)) {
        myGame.move(parseInt(command.split(" ")[1]));
    } else if (command === 'REPORT') {
        myGame.report();
    } else  if (command === 'RIGHT') {
        myGame.right();
    }
};

function validMoveCommand(userCommand) {
    let valid = true;

    // Starts with move
    if(!userCommand.startsWith('MOVE')) {
        valid = false;
    }

    // Check if splitting the value using a space gives an array of length 2
    const moveCommandStrings = userCommand.split(" ");
    
    if(moveCommandStrings.length !== 2) {
        valid = false;
    }

    // Check if element 2 can be converted to an int
    if(!isNumber(moveCommandStrings[1])) {
        valid = false;
    }

    return valid;
}