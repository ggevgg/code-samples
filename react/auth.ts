import { Reducer } from 'redux'
import {
  LoginAction,
  LogoutAction,
  LoginSuccessAction,
  LoginFailAction,
  SetUserAction,
} from '../actions/AuthActions'
import {
  AUTH_LOGOUT,
  AUTH_SUCCESS_LOGIN,
  AUTH_SUCCESS_REGISTER,
  AUTH_FAIL_LOGIN,
  AUTH_FAIL_REGISTER,
  AUTH_SET_USER,
} from '../constants'

export interface User {
  email: string
  username: string
}

export interface AuthState {
  isLoggedIn: boolean
  user: User | null
  token: string | null
}

const defaultState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
}

const auth: Reducer<AuthState> = (
  state = defaultState,
  action:
    LoginAction |
    LogoutAction |
    LoginSuccessAction |
    LoginFailAction |
    SetUserAction,
): AuthState => {
    switch (action.type) {

      case AUTH_SUCCESS_LOGIN:
        return {
          ...state,
          isLoggedIn: true,
          user: {
            username: action.username,
            email: action.email,
          },
        }

      case AUTH_FAIL_LOGIN:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        }

      case AUTH_SUCCESS_REGISTER:
        return {
          ...state,
          isLoggedIn: true,
          user: {
            username: action.username,
            email: action.email,
          },
        }

      case AUTH_FAIL_REGISTER:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        }

      case AUTH_LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        }

      case AUTH_SET_USER:
        return {
          ...state,
          user: action.user,
          token: action.token,
        }
      
      default:
        return state
    }
}

export default auth