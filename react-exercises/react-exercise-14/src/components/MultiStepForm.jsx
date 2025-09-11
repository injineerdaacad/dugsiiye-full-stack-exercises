import { useReducer } from 'react';
import { multiStepFormReducer, initialState } from "../reducers/multiStepFormReducer.js";

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(multiStepFormReducer, initialState);

  const handleNextStep = () => dispatch({ type: 'NEXT_STEP' });

  const disableNextStep = (state.step === 1 && (state.firstName.trim() === '' || state.lastName.trim() === ''))
    ||
    (state.step === 2 && (state.email.trim() === '' || state.phone.trim() === ''));

  const handlePrevStep = () => dispatch({ type: 'PREVIOUS_STEP' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FORM",
      payload: { [name]: value },
    });
  };

  const handleResetForm = () => dispatch({ type: "RESET_FORM" });

  const handleSubmit = () => {
    alert(`Form submitted successfully!\n${JSON.stringify(state, null, 2)}`);
    handleResetForm();
  };

  return (
    <div>
      <h2>Multi-Step Registration</h2>
      {state.step === 1 && (
        <div>
          <h3>Step 1: Profile</h3>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={state.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleNextStep} disabled={disableNextStep}>
            Next
          </button>
        </div>
      )}

      {state.step === 2 && (
        <div>
          <h3>Step 2: Contact</h3>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={state.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handlePrevStep}>Back</button>
          <button onClick={handleNextStep} disabled={disableNextStep}>
            Next
          </button>
        </div>
      )}

      {state.step === 3 && (
        <div>
          <h3>Step 3: Review</h3>
          <p>
            <strong>First Name:</strong> {state.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {state.lastName}
          </p>
          <p>
            <strong>Email:</strong> {state.email}
          </p>
          <p>
            <strong>Phone:</strong> {state.phone}
          </p>
          <button onClick={handlePrevStep}>Back</button>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      )}
      
      {state.step > 3 && (
        <div>
          <h3>Form Completed</h3>
          <button onClick={handleResetForm}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;