import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [initialTime, setInitialTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleInputChange = (e) => {
    if (isRunning) return;
    const value = Math.max(0, Number(e.target.value));
    setInitialTime(value);
    setTimeLeft(value);
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setInitialTime("");
    setTimeLeft(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let timerId;

    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setInitialTime(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  return (
    <div>
      <h2>Countdown Timer</h2>

      <label>Set Time (seconds): </label>
      <input
        type="number"
        min="0"
        value={initialTime}
        onChange={handleInputChange}
        disabled={isRunning}
      />

      <p>Time Left: {timeLeft} seconds</p>

      <button onClick={handleStart} disabled={isRunning || timeLeft === 0}> Start</button>
      <button onClick={handleStop} disabled={!isRunning}> Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default CountdownTimer;