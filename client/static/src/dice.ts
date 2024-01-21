function rollDice() {
  const dice = [...document.querySelectorAll(".die-list")] as any;
  dice.forEach((die: any) => {
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
  });
}

function toggleClasses(die: any) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min: any, max: any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//  document.getElementById("roll-button").addEventListener("click", rollDice);
