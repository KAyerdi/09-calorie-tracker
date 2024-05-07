import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";
import { Activity } from "../types";

//DEFINO EL TYPE PARA EL PROPS CHILDREN, RectNode HACE QUE EL CHILDREN PUEDA SER RENDERIZADO POR REACT
type ActivityProviderProps = {
  children: ReactNode
}

//DEFINO EL CONTEXT
type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
  }

//CREAR CONTEXT
export const ActivityContext = createContext <ActivityContextProps>(null!)

// DEFINIR PROVIDER
export const ActivityProvider = ({children} : ActivityProviderProps) => {

  const [state, dispatch ] = useReducer(activityReducer, initialState)

  // Contadores
  const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])
  const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

  const categoryName = useMemo(() =>
    (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '' )
, [state.activities])

const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

  return(
    <ActivityContext.Provider
      value={{
      state,
      dispatch,
      caloriesConsumed,
      caloriesBurned,
      netCalories,
      categoryName,
      isEmptyActivities

    }}>
          {children}
      </ActivityContext.Provider>
  )
}