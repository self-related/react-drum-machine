import { useState, useEffect, useRef } from 'react';
import './App.css';

const SOUNDMAP_1 = {
  Q: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3',
  W: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3',
  E: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3',
  A: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3',
  S: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3',
  D: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3',
  Z: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
  X: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3',
  C: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3',
};

function SoundButton({keyButton, url, keyDownMap, display}) {
  const refAudio = useRef();
  const refButton = useRef();

  keyDownMap[keyButton] = refButton;

  const handleClick = (_event) => {
    refAudio.current.currentTime = 0;
    refAudio.current.play();
    display.current.innerText = `${keyButton}-sound`;
  };
  
  return (
    <button  ref={refButton} id={keyButton} className='drum-pad' onClick={handleClick} >
      {keyButton}
      <audio  ref={refAudio} className='clip' src={url}></audio>
    </button>
  );
}

function App() {
  const soundButtons = new Array();
  const refDisplay = useRef();

  const keyDownMap = {};
  for (const keyButton in SOUNDMAP_1) {
    soundButtons.push(<SoundButton display={refDisplay} keyDownMap={keyDownMap} key={`${keyButton}-sound`} id={`${keyButton}-sound`} keyButton={keyButton} url={SOUNDMAP_1[keyButton]} />);

  }

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    console.log(key);
    if (Object.keys(SOUNDMAP_1).includes(key)) {
      keyDownMap[key].current.click();
    }
  };

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown); //prevents adding countless events
    window.addEventListener('keydown', handleKeyDown);
  },[]);

  return (
    <>
      <div id="drum-machine">
        {soundButtons}
      </div>
      <div id="display" ref={refDisplay} >
      </div>
    </>
  );
}

export default App;
