import { createContext, useContext } from "react";

export const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);