import React, { useState, useEffect } from "react";
import "./newTimer.css";

function NewTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialtimer, setInitialtimer] = useState(300);
  const [time, setTime] = useState(300);
  const [isActive, setIsActive] = useState(true);
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    setHours(Math.floor(time / 3600));
    setMinutes(Math.floor(time / 60));
    setSeconds(time % 60);
  }, []);

  useEffect(() => {
    setTime(Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds));
    setInitialtimer(
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
    );
  }, [hours, minutes, seconds]);
  console.log(hours, minutes, seconds);

  useEffect(() => {
    let intervalId;
    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const handleSetTime = () => {
    setTime(hours * 3600 + minutes * 60 + seconds);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(initialtimer);
    setIsInput(false);
  };

  const handleStartStop = () => {
    setIsActive((prev) => !prev);
    setIsInput(false);
  };

  const formatTime = (time) => {
    const hh = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const mm = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const ss = (time % 60).toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  return (
    <div className="container">
      <h1>Timer</h1>
      <div
        className="inputParent"
        onClick={() => {
          setIsInput(true);
          setIsActive(false);
        }}
      >
        {isInput ? (
          <div className="inputContainer">
            <div className="inputChild">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <span>Hr:</span>
            </div>
            <div className="inputChild">
              <input
                type="number"
                min={0}
                max={99}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
              <span>Mn:</span>
            </div>
            <div className="inputChild">
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
              <span>Sc:</span>
            </div>
          </div>
        ) : (
          <span className="timer">{formatTime(time)}</span>
        )}
      </div>
      <div>
        {/* <button onClick={handleSetTime}>Set Time</button> */}
        {isActive ? (
          time === 0 ? (
            <button onClick={handleStartStop} className="stop">
              ok
            </button>
          ) : (
            <button onClick={handleStartStop} className="stop">
              Stop
            </button>
          )
        ) : (
          <button onClick={handleStartStop} className="start">
            Start
          </button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default NewTimer;
