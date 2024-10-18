//init DOM consts:
const testButton1 = document.getElementById('test-button-1');

const soundHeater = new Audio("https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3");


const playSound = async () => {
    soundHeater.play();

};

const handleClickButton1 = (event) => {
    console.log('test-button-1 clicked');
    soundHeater.currentTime = 0;
    playSound();

};
testButton1.addEventListener('click', handleClickButton1);