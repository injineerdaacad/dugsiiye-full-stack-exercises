import { useState, useEffect } from "react";

const MouseTracker = () => {
  const [mouseCoordinate, setMouseCoordinate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMouseCoordinate({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h2>Mouse Tracker</h2>
      <p>X: {mouseCoordinate.x}</p>
      <p>Y: {mouseCoordinate.y}</p>
    </div>
  );
};

export default MouseTracker;