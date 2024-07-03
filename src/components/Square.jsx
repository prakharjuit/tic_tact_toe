import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <button
      className="square"
      onClick={onClick}
      style={{ backgroundColor: value }}
    ></button>
  );
};

export default Square;
