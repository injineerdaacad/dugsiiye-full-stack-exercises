export const initialState = [];

export const contactReducer = (state, action) => {
  switch (action.type) {

    case "add":
      return [
        ...state,
        {
          ...action.payload,
          id: crypto.randomUUID(),
          favorite: false,
        },
      ];
    
    case "edit":
      return state.map((contact) => contact.id === action.payload.id ? action.payload : contact);
    
    case "delete":
      return state.filter((contact) => contact.id !== action.payload);
    
    case "toggleFavorite":
      return state.map((contact) => contact.id === action.payload ? { ...contact, favorite: !contact.favorite } : contact);
    
    default:
      return state;
  }
};