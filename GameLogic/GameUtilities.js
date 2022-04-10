const validator = require("validator");

class GameUtilities {
  // Checks if the MOVE command has the valid format
  static validMoveCommand(userCommand) {
    let valid = true;

    // Starts with move
    if (!userCommand.startsWith("MOVE")) {
      valid = false;
    }

    // Check if splitting the value using a space gives an array of length 2
    const moveCommandStrings = userCommand.split(" ");

    if (moveCommandStrings.length !== 2) {
      valid = false;
    }

    // Check if element 2 can be converted to an int
    if (
      moveCommandStrings.length === 2 &&
      !validator.isNumeric(moveCommandStrings[1])
    ) {
      valid = false;
    }

    return valid;
  }

  // Returns random set of coordinates
  static generateCoordinates() {
    return [
      GameUtilities.getRandomNumbersFromRange(100),
      GameUtilities.getRandomNumbersFromRange(100),
    ];
  }

  // Specify a max number and it will generate a random number upto that number but not including
  static getRandomNumbersFromRange(range) {
    return Math.floor(Math.random() * range);
  }
}

module.exports = GameUtilities;
