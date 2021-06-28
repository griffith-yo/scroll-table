import { combineReducers } from 'redux'
import { dataReducer } from './dataReducer'
import { appReducer } from './appReducer'

export const rootReducer = combineReducers({
  data: dataReducer,
  app: appReducer,
})
