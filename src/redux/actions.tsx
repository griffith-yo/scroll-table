import {
  CHANGE_PAGE,
  FETCH_USERS,
  HIDE_ALERT,
  HIDE_LOADER,
  PLUS_PAGE,
  SHOW_ALERT,
  SHOW_LOADER,
} from './types'
import { usersApiService } from '../users-api.service'
import { IActionType } from '../interfaces'

// ============== APP ACTIONS ==============

export function showLoader(): IActionType {
  return {
    type: SHOW_LOADER,
  }
}

export function hideLoader(): IActionType {
  return {
    type: HIDE_LOADER,
  }
}

export function showAlert(text: string): Function {
  return (dispatch: Function) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    })
    dispatch(hideAlert())
  }
}

export function hideAlert(): IActionType {
  return {
    type: HIDE_ALERT,
  }
}

// ============== FETCH ACTIONS ================

export function plusPage(): IActionType {
  return {
    type: PLUS_PAGE,
  }
}

export function changePage(page: number): Function {
  return (dispatch: Function) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: page,
    })
  }
}

export function fetchUsers(page: number): Function {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      let response = await usersApiService.getUsers(page)
      /* Тест ошибки
      throw 'Обрати внимание, пришла ошибка!'
      */
      if (!response.isHasMore) {
        dispatch(changePage(1))
        response = await usersApiService.getUsers(1)
      }

      dispatch({ type: FETCH_USERS, payload: response })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}
