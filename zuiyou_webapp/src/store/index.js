import React, { useReducer } from "react";
const initialState = {
  showInvitate: false,
  showAddMedia: false,
  showAddPic: false,
  showAddCategory: false,
  showComment:true,
  percent: 0,
  categoryMes: "",
};

function rootReducer(state, action) {
  switch (action.type) {
    case "showInvitate":
      return { ...state, showInvitate: true };
    case "noshowInvitate":
      return { ...state, showInvitate: false };
    case "showComment":
      return { ...state, showComment: true };
    case "noshowComment":
      return { ...state, showComment: false };
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
    case "message_id":
      return {...state,message_id:action._id}
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
