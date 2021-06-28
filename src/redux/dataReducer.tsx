import { IDataReducer, IDataState } from '../interfaces'
import { CHANGE_PAGE, FETCH_USERS, PLUS_PAGE } from './types'

const initialState: IDataState = {
  page: 1,
  fetchedUsers: { data: [], isHasMore: true },
}

export const dataReducer = (state = initialState, action: IDataReducer) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case PLUS_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }
    case FETCH_USERS:
      return {
        ...state,
        fetchedUsers: action.payload,
      }
    default:
      return state
  }
}
