export const initialState = [];

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload.text,
          completed: false,
        },
      ];

    case "EDIT_TODO":
      return state.map((todo) => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo);

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);

    case "TOGGLE_TODO":
      return state.map((todo) => todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo);

    default:
      return state;
  }
};