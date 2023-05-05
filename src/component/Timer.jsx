import "./timer.css";
import { useState } from "react";
import { useEffect } from "react";

function Timer() {
  const [timer, setTimer] = useState(60);
  const [initialTimer, setInitialTimer] = useState(60);
  const [toggle, setToggle] = useState(true);
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setToggle(false);
        }
        return prev - 1;
      });
    }, 1000);
    if (!toggle) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [toggle]);
  const handleReset = () => {
    setTimer(initialTimer);
    setToggle(false);
  };
  const handleChange = (e) => {
    setTimer(e.target.value);
    setInitialTimer(e.target.value);
  };

  return (
    <div className="timer">
      <div className="background"></div>
      <div className="container">
        <div
          className="timer"
          onClick={() => {
            setIsInput(true);
            setToggle(false);
          }}
        >
          {isInput ? (
            <input type="number" onChange={handleChange} />
          ) : (
            <p>{timer}</p>
          )}
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setToggle((prev) => !prev);
              setIsInput(false);
            }}
          >
            {!toggle ? "start" : "stop"}
          </button>
          <button onClick={handleReset}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
