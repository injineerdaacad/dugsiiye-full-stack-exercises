import { useState } from "react";

const ToggleButton = () => {
    const [isOn, setIsOn] = useState(true);

    const toggleButton = () => {
        setIsOn(!isOn);
    }

    return (
        <div>
            <p>The button is {isOn ? 'On' : 'Off'}</p>
            <button onClick={toggleButton}>Turn {isOn ? 'Off' : 'On'}</button>
        </div>
    )
}

export default ToggleButton;