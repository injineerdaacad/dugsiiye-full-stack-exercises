import { useReducer } from "react";
import { doubleCounterReducer, initialState } from "../reducers/doubleCounterReducer.js";

const DoubleCounter = () => {
  const [state, dispatch] = useReducer(doubleCounterReducer, initialState);

  const handleIncrementA = () => {dispatch({ type: "INCREMENT_A" });};

  const handleDecrementA = () => {state.counterA > 0 && dispatch({ type: "DECREMENT_A" });};

  const handleIncrementB = () => {dispatch({ type: "INCREMENT_B" });};

  const handleDecrementB = () => {state.counterB > 0 && dispatch({ type: "DECREMENT_B" });};

  const handleReset = () => {dispatch({ type: "RESET_ALL" });};

  return (
    <div>
      <h2>Double Counter</h2>

      <div>
        <h3>Counter A: {state.counterA}</h3>
        <button onClick={handleDecrementA} disabled={state.counterA === 0}>- A</button>
        <button onClick={handleIncrementA}>+ A</button>
      </div>

      <div>
        <h3>Counter B: {state.counterB}</h3>
        <button onClick={handleDecrementB} disabled={state.counterB === 0}>- B</button>
        <button onClick={handleIncrementB}>+ B</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleReset}>Reset Both</button>
      </div>
    </div>
  );
};

export default DoubleCounter;