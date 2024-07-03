import React from "react";

const Scoreboard = ({ blueScore, redScore }) => {
  return (
    <div className="scoreboard">
      <div>Blue: {blueScore}</div>
      <div>Red: {redScore}</div>
    </div>
  );
};

export default Scoreboard;
