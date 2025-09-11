export const initialState = {
  step: 1,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export const multiStepFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREVIOUS_STEP":
      return { ...state, step: state.step - 1 };
    case "UPDATE_FORM":
      return { ...state, ...action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};