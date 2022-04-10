module.exports = class LoggerService {
  static logInformation(x, y, direction) {
    // If direction exists, this means that this is R2D2
    if (direction) {
      let r2d2InfoString = `R2-D2 is at ${x},${y} facing ${direction}`;
      console.log(r2d2InfoString);
    } else {
      let obiWanKenobiString = `Obi Wan Kenobi is at ${x},${y}`;
      console.log(obiWanKenobiString);
    }
  }

  static logCongratulations() {
    console.log(`Congratulations, you've saved the Rebellion!`);
    console.log("exit(0)");
  }
};
