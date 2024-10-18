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

function SoundButton({keyButton, url, keyDownMap, display, volume}) {
  const refButton = useRef();
  const refAudio = useRef();
  // const sound = new Audio(url);

  // sound.volume = volume / 100;

  //создается ссылка на <button> с ключем нажимаемой кнопки (Q, W, E, etc)
  keyDownMap[keyButton] = refButton; 

  const handleClick = (_event) => {
    refAudio.current.currentTime = 0;
    refAudio.current.play();
    display.current.innerText = `${keyButton}-sound`;
  };
  
  useEffect(() => {
    if (refAudio.current?.volume || refAudio.current?.volume === 0) {
      refAudio.current.volume = (volume || 1) / 100;
    }
  },[volume]);
  
  return (
    <button  ref={refButton} id={keyButton} className='drum-pad' onClick={handleClick} >
      {keyButton}
      <audio  ref={refAudio} className='clip' src={url}></audio>
    </button>
  );
}

function VolumeControl({volume, setVolume}) {
  const handleChange = (event) => {
    setVolume(event.target.value);
  };
  
  return (
    <div id="volume-control-box">
      <label htmlFor='volume-control'>Громкость:<span> {volume}%</span></label>
      <input id="volume-control" type='range' value={volume} onChange={handleChange}/>
    </div>
  );
}

function App() {
  const [volume, setVolume] = useState(50);   //изначальная громкость
  const refDisplay = useRef();                //реф на div элемент, отображает название трека, передается в SoundButton

  //лист с компонентами, содержащими кнопки
  const soundButtons = new Array();               

  //объект для ссылок на кнопки, передается в каждый компонент SoundButton
  const keyDownMap = {};                          
  
  //собрать ключи и url для каждого трека, создать компонент и передать параметры
  for (const keyButton in SOUNDMAP_1) {
    soundButtons.push(<SoundButton  key={`${keyButton}-sound`} id={`${keyButton}-sound`} display={refDisplay} keyDownMap={keyDownMap} keyButton={keyButton} url={SOUNDMAP_1[keyButton]} volume={volume} />);
  }

  //обработать нажатие кнопки
  //если кнопка совпадает с одним из ключей в SOUNDMAP_1, то кликается на соотв кнопка
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    console.log(key);
    if (Object.keys(SOUNDMAP_1).includes(key)) {
      keyDownMap[key].current.click(); //нажимает на нужный <button>
    }
  };

  //после рендера удаляется старый и создается новый ивент на нажатие кнопки
  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown); //prevents adding countless events
    window.addEventListener('keydown', handleKeyDown);
  },[]);

  return (
    <>
      <div id="drum-machine">
        {soundButtons}
      </div>
      <VolumeControl volume={volume} setVolume={setVolume} />
      <div id="display" ref={refDisplay}></div>
    </>
  );
}

export default App;
