export const initialState = [];

export const contactReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state,
        {
          ...action.payload,
          id: crypto.randomUUID(),
          favorite: false,
        },
      ];

    case "EDIT_CONTACT":
      return state.map((contact) => contact.id === action.payload.id ? action.payload : contact);

    case "DELETE_CONTACT":
      return state.filter((contact) => contact.id !== action.payload);

    case "TOGGLE_FAVORITE":
      return state.map((contact) => contact.id === action.payload ? { ...contact, favorite: !contact.favorite } : contact);

    default:
      return state;
  }
};