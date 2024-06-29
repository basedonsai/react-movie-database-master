import React from 'react';

function RandomButton({ getRandomMovie }) {
  return (
    <div className="random-button-wrap">
      <button className="random-button" onClick={getRandomMovie}>Random Movie</button>
    </div>
  );
}

export default RandomButton;
