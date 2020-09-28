import React,{useReducer} from 'react'
const initialState={
    showInvitate:false,
    showAddMedia:false,
    showAddPic:false,
    percent:0
}

function rootReducer(state,action){
    console.log("store.state",state)
    console.log("store.action",action)
    switch (action.type){
        case "showInvitate":
            return {...state,showInvitate:true}
        case "noshowInvitate":
            return {...state,showInvitate:false}
        case "showAddMedia":
            return {...state,showAddMedia:true}
        case "noshowAddMedia":
            return {...state,showAddMedia:false}
        case "showAddPic":
              return {...state,showAddPic:true}
        case "noshowAddPic":
              return {...state,showAddPic:false}
        case "percent":
              return {...state,percent:action.value}
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