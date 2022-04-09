const LoggerService = require('./LoggerService');

const Direction = {
    NORTH: 'North',
    SOUTH: 'South',
    EAST: 'East',
    WEST: 'West',
}

// The Game class keeps track of the overall game functionality
class Game {
    gameOver = false;
    facingDirection = Direction.NORTH;
    r2d2Coords = [];
    obiWanKenobiCoords = [];

    // Initializes game
    initializeGame() {
        this.assignRandomCoordinates();
        this.assignRandomDirection();
    }

    // Checks if coordinates have been assigned to r2d2 and obiWanKenobi
    coordinatesAssigned() {
        return this.r2d2Coords.length === 2 && this.obiWanKenobiCoords.length === 2;
    }

    // Assigns random coordinates to r2d2 and obiWanKenobi
    assignRandomCoordinates() {
        const r2d2 = this.generateCoordinates();
        const obiWanKenobi = this.generateCoordinates();

        // If the r2d2 and obi wan kenobi have the same coordinates, re-run the function until they are different
        while(r2d2[0] === obiWanKenobi[0] && r2d2[1] === obiWanKenobi[1]) {
            r2d2 = this.generateCoordinates();
            obiWanKenobi = this.generateCoordinates();
        }

        this.r2d2Coords = r2d2;
        this.obiWanKenobiCoords = obiWanKenobi;
    }

    // Assigns random facing direction
    assignRandomDirection() {
        const direction = this.getRandomNumbersFromRange(4);
        switch(direction) {
            case 0:
                this.facingDirection = Direction.NORTH;
                break;
            case 1:
                this.facingDirection = Direction.SOUTH;
                break;
            case 2:
                this.facingDirection = Direction.EAST;
                break;
            case 3:
                this.facingDirection = Direction.WEST;
                break;                
        }
    }

    // Returns random set of coordinates
    generateCoordinates() {
        return [this.getRandomNumbersFromRange(100), this.getRandomNumbersFromRange(100)];
    }

    // Specify a max number and it will generate a random number upto that number but not including
    getRandomNumbersFromRange(range) {
        return Math.floor(Math.random() * range);
    }

    // LAND command handler
    land() {
        this.initializeGame();
        this.report();
    }

    // MOVE command handler
    move(numSpaces) {
        switch(this.facingDirection) {
            case Direction.NORTH:
                if(this.r2d2Coords[1] + numSpaces <= 99) {
                    this.r2d2Coords[1]+=numSpaces;
                }
                break;
            case Direction.SOUTH:
                if(this.r2d2Coords[1] - numSpaces >= 0) {
                    this.r2d2Coords[1]-=numSpaces;
                }
                break;
            case Direction.EAST:
                if(this.r2d2Coords[0] + numSpaces <= 99) {
                    this.r2d2Coords[0]+=numSpaces;
                }
                break;
            case Direction.WEST:
                if(this.r2d2Coords[0] - numSpaces >= 0) {
                    this.r2d2Coords[0]-=numSpaces;
                }
                break;
            default:
                break;
        }
        this.checkIfWon();
    }

    // Checks if r2d2 coords has the same values as obiWanKenobi
    checkIfWon() {
        if(this.r2d2Coords[0] === this.obiWanKenobiCoords[0] && this.r2d2Coords[1] === this.obiWanKenobiCoords[1]) {
            LoggerService.logCongratulations();
            this.gameOver = true;
        }
    }

    // REPORT command handler
    report() {
        LoggerService.logInformation(this.r2d2Coords[0], this.r2d2Coords[1], this.facingDirection)
        LoggerService.logInformation(this.obiWanKenobiCoords[0], this.obiWanKenobiCoords[1])
    }

    // RIGHT command handler
    right() {
        switch(this.facingDirection) {
            case Direction.NORTH:
                this.facingDirection = Direction.EAST;
                break;
            case Direction.SOUTH:
                this.facingDirection = Direction.WEST;
                break;
            case Direction.EAST:
                this.facingDirection = Direction.SOUTH;
                break;
            case Direction.WEST:
                this.facingDirection = Direction.NORTH;
                break;
            default:
                break;
        }
    }
}

module.exports = Game;