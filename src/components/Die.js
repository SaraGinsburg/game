import React from "react";

const Die = ({ value, isHeld, onClick }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "#FFFFFF",
  };
  return (
    <div className="die-face" style={styles} onClick={onClick}>
      <h2>{value}</h2>
    </div>
  );
};

export default Die;
