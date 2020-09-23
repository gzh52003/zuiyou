import React,{useReducer} from 'react'
const initialState={
    showInvitate:false
}

function rootReducer(state,action){
    console.log("store.state",state)
    console.log("store.action",action)
    switch (action.type){
        case "show":
            return {...state,showInvitate:true}
        case "noshow":
            return {...state,showInvitate:false}
        default:
                return state
        }
};

export const GlobalContext = React.createContext()

export default function Provider({children}){
  const [state,dispatch]= useReducer(rootReducer,initialState)
  return (
    <GlobalContext.Provider value={{state,dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}