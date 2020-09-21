import React from 'react';



const FooterMenu = (props) => {
  const {
    onPlay,
    onPause,
    onStop,
    state,
    speed,
    characters,
    onSpeedChange,
    onCharactersChange,
  } = props;

  return (
    <div>
      {/* PLAY */}
      <button
        disabled={state === 'running'}
        onClick={onPlay}
      >Play</button>
      {/* PAUSE*/}
      <button
        disabled={['stop', 'pause'].includes(state)}
        onClick={onPause}
      >Pause</button>
      {/* STOP */}
      <button
        disabled={state === 'stop'}
        onClick={onStop}
      >Stop</button>
      {/* SPEED SLIDER */}
      <input
        onChange={(e) => onSpeedChange(e.target.value)}
        value={speed}
        type={"range"}
        min={20}
        max={100}
        step={5}
      />
      <input
        onChange={(e) => onCharactersChange(e.target.value)}
        value={characters}
        type={"range"}
        min={5}
        max={50}
        step={1}
      />
    </div>
  );
};

export default FooterMenu;