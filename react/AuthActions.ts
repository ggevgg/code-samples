import {
  AUTH_LOGOUT,
  API_AUTH_LOGIN,
  AUTH_SUCCESS_LOGIN,
  AUTH_FAIL_LOGIN,
  API_AUTH_REGISTER,
  AUTH_SUCCESS_REGISTER,
  AUTH_FAIL_REGISTER,
  AUTH_SET_USER,
  API_AUTH_REFRESH,
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_NICKNAME,
} from '../constants'
import { ThunkResult, Dispatch } from '../store'
import API, { addAxiosInterceptor, removeAxiosInterceptor } from '../utils/api'
import { User } from '../reducers/auth'
import * as NotifyActions from './NotifyActions'

export interface LoginAction {
  type: 'AUTH_LOGIN'
  email: string
  password: string
  username?: string
}

export interface LoginSuccessAction {
  type:
    'AUTH_SUCCESS_LOGIN' |
    'AUTH_SUCCESS_REGISTER'
  email: string
  username: string
}

export interface LoginFailAction {
  type:
    'AUTH_FAIL_LOGIN' |
    'AUTH_FAIL_REGISTER'
  email: string
  error: string
}

export interface LogoutAction {
  type: 'AUTH_LOGOUT'
}

export interface SetUserAction {
  type: 'AUTH_SET_USER'
  user: User
  token: string
}

export interface GetUserAction {
  type: 'AUTH_GET_USER'
}

export const login = (
  email: string,
  password: string,
): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await API.post(API_AUTH_LOGIN, {
        email,
        password,
      })
      const { user } = response.data
      const { token } = response.headers
      addAxiosInterceptor(token)
      saveToLocalStorage(user, token)
      dispatch({
        type: AUTH_SUCCESS_LOGIN,
        email,
      })
      dispatch(NotifyActions.info('Logged successfully'))
      location.href = '/room'
    } catch (error) {
      removeFromLocalStorage()
      dispatch({
        type: AUTH_FAIL_LOGIN,
        email,
        error,
      })
      dispatch(NotifyActions.error('Bad credentials'))
    }
  } 
}

export const register = (
  email: string,
  password: string,
  username: string,
): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await API.post(API_AUTH_REGISTER, {
        email,
        password,
        username,
      })
      const { user } = response.data
      const { token } = response.headers
      addAxiosInterceptor(token)
      saveToLocalStorage(user, token)
      dispatch({
        type: AUTH_SUCCESS_REGISTER,
        email,
        username,
      })
      dispatch(NotifyActions.info('Registered successfully'))
      location.href = '/room'
    } catch (error) {
      removeFromLocalStorage()
      dispatch({
        type: AUTH_FAIL_REGISTER,
        email,
        username,
        error,
      })
      dispatch(NotifyActions.error('Error register'))
    }
  } 
}

export const logout = (): LogoutAction => {
  removeFromLocalStorage()
  removeAxiosInterceptor()
  return {
    type: AUTH_LOGOUT,
  }
}

export const setUser = (user: User, token: string): SetUserAction => {
  return {
    type: AUTH_SET_USER,
    user,
    token,
  }
}

export const getUser = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    try {
      const _token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
      if (!_token) {
        return
      }
      addAxiosInterceptor(_token)
      const result = await API.get(API_AUTH_REFRESH)

      const { user } = result.data
      const { token } = result.headers

      if (!token) {
        return dispatch({
          type: AUTH_LOGOUT,
        })
      }

      addAxiosInterceptor(token)
      saveToLocalStorage(user, token)

      dispatch({
        type: AUTH_SET_USER,
        user,
        token,
      })
    } catch(e) {
      console.log(e)
      dispatch({
        type: AUTH_LOGOUT,
      })
    }
  }
}

export const saveToLocalStorage = (user: User, token: string): void => {
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify({ user }))
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
  localStorage.setItem(LOCAL_STORAGE_NICKNAME, user.username)
}

export const removeFromLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_USER)
  localStorage.removeItem(LOCAL_STORAGE_TOKEN)
}