import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";

//DEFINO EL TYPE PARA EL PROPS CHILDREN, RectNode HACE QUE EL CHILDREN PUEDA SER RENDERIZADO POR REACT
type ActivityProviderProps = {
  children: ReactNode
}

//DEFINO EL CONTEXT
type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
  }

//CREAR CONTEXT
export const ActivityContext = createContext <ActivityContextProps>(null!)

// DEFINIR PROVIDER
export const ActivityProvider = ({children} : ActivityProviderProps) => {

  const [state, dispatch ] = useReducer(activityReducer, initialState)

  return(
    <ActivityContext.Provider
      value={{
      state,
      dispatch
    }}>
          {children}
      </ActivityContext.Provider>
  )
}