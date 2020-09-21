import React from 'react';



const FooterMenu = ({ onPlay, onPause, onStop, onSpeedChange, state, speed }) => {
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
    </div>
  );
};

export default FooterMenu;