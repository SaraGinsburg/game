import React, { useState, useEffect } from "react";
import Die from "./components/Die";

const App = () => {
  const [dice, setDice] = useState([{}]);

  const allNewDice = () => {
    const rand = [...Array(10)].map((_) => Math.ceil(Math.random() * 6));
    setDice(rand.map((el) => ({ ["value"]: el, ["isHeld"]: false })));
    console.log("dice", dice);
  };

  const holdDice = (el, index) => {
    console.log("this is the id of the dice: ", index, "el", el);
    setDice(
      dice.map((d, i) => {
        return i === index ? { ...d, isHeld: !d.isHeld } : d;
      })
    );

    // }
    //push to github
    //testing
    //testing again

    const heldEl = { ...el, isHeld: !el.isHeld };
    console.log("heldEl", heldEl);
    // const updatedDice = setDice(...dice, heldEl);
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

  useEffect(() => {
    allNewDice();
  }, []);

  return (
    <main className="board">
      <div className="inlay">
        <h3>Tenzies</h3>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{newDiceFaces}</div>
        <button onClick={allNewDice}>Roll</button>
      </div>
    </main>
  );
};

export default App;
