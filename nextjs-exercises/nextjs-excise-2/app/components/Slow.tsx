"use client";
import { useEffect, useState } from "react";
    

const Slow = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="text-lg font-semibold">Loading...</div>;
  }

  return <div className="text-lg font-semibold">Slow Component Loaded!</div>;
};

export default Slow;