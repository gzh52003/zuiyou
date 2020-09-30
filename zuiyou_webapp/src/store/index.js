import React, { useReducer } from "react";
const initialState = {
  showInvitate: false,
  showAddMedia: false,
  showAddPic: false,
  showAddCategory: false,
  percent: 0,
  categoryMes: "",
};

function rootReducer(state, action) {
  console.log("store.state", state);
  console.log("store.action", action);
  switch (action.type) {
    case "showInvitate":
      return { ...state, showInvitate: true };
    case "noshowInvitate":
      return { ...state, showInvitate: false };
    case "showAddMedia":
      return { ...state, showAddMedia: true };
    case "noshowAddMedia":
      return { ...state, showAddMedia: false };
    case "showAddCategory":
      return { ...state, showAddCategory: true };
    case "noshowAddCategory":
      return { ...state, showAddCategory: false };
    case "showAddPic":
      return { ...state, showAddPic: true };
    case "noshowAddPic":
      return { ...state, showAddPic: false };
    case "percent":
      return { ...state, percent: action.value };
    case "addCategory":
      return { ...state, categoryMes: action.value };
    default:
      return state;
  }
}

export const GlobalContext = React.createContext();

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
