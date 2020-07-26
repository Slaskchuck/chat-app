import { put } from 'redux-saga/effects'

import { UserAction } from '../Action'

import API from '../Api'
import SocketClient from '../SocketClient'

import { AuthStorage } from '../../Utils'

/**
 * Saga for user login
 */
export function* userLogin({ data: request }) {
  yield put(UserAction.userLoginRequest())

  try {
    AuthStorage.removeAll()

    const { data: { data } } = yield API.gateway.post(
      API.routes.user.login(),
      request,
    )

    API.gateway.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

    AuthStorage.token.set(data.token)

    yield put(UserAction.userLoginSuccess())
  } catch (err) {
    yield put(UserAction.userLoginFailure({
      message: err.response.data.error.detail
    }))
  }
}

/**
 * Saga for user getting own profile
 */
export function* getUserByToken({ data: { isPageRequest } }) {
  if (isPageRequest)
    yield put(UserAction.userTokenPageRequest())
  else
    yield put(UserAction.userTokenRequest())

  try {
    SocketClient.io.opts.query = {}
    SocketClient.disconnect()
    const token = AuthStorage.token.get()

    API.gateway.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const { data: { data } } = yield API.gateway.get(
      API.routes.user.token(),
    )

    SocketClient.io.opts.query = { token }
    SocketClient.connect()

    yield put(UserAction.userTokenSuccess(data))
  } catch (err) {
    yield put(UserAction.userTokenFailure({
      message: err.response.data.error.detail
    }))
  }
}

/**
 * Saga for user logout
 */
export function* userLogout({ data: request }) {
  yield put(UserAction.userLogoutRequest())

  try {
    AuthStorage.removeAll()

    yield API.gateway.delete(
      API.routes.user.token(),
      request,
    )

    API.gateway.defaults.headers.common['Authorization'] = ''

    yield put(UserAction.userLogoutSuccess())
  } catch (err) {
    yield put(UserAction.userLogoutFailure({
      message: err.response.data.error.detail
    }))
  }
}