import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";

const App = () => {
  const [dice, setDice] = useState([{}]);
  const [tenzies, setTenzies] = useState(false);

  const allNewDice = () => {
    const rand = [...Array(10)].map((_) => Math.ceil(Math.random() * 6));

    const updatedDice =
      dice.length === 1 || tenzies
        ? rand.map((el) => ({
            value: el,
            isHeld: false,
          }))
        : rand.map((el, i) => {
            return dice[i].isHeld
              ? dice[i]
              : {
                  value: el,
                  isHeld: false,
                };
          });

    setDice(updatedDice);
    tenzies && setTenzies(false);
  };

  const holdDice = (el, index) => {
    setDice(
      dice.map((d, i) => {
        return i === index ? { ...d, isHeld: !d.isHeld } : d;
      })
    );
  };

  const newDiceFaces = dice.map((el, i) => (
    <Die
      key={i}
      value={el.value}
      isHeld={el.isHeld}
      onClick={() => {
        holdDice(el, i);
      }}
    />
  ));

  const gameWon = () => {
    const sameVal = dice.every((el) => el.value === dice[0].value);
    const allHeld = dice.every((el) => el.isHeld);
    if (sameVal && allHeld) {
      setTenzies(true);
      console.log("you won!!!!");
    }
  };

  useEffect(() => {
    allNewDice();
  }, []);

  useEffect(() => {
    gameWon();
  }, [dice]);

  return (
    <main className="board">
      <div className="inlay">
        {tenzies && <Confetti />}
        <h3>Tenzies</h3>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{newDiceFaces}</div>

        <button onClick={allNewDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  );
};

export default App;
