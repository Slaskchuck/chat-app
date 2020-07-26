import { put, fork } from 'redux-saga/effects'

import { ChatAction } from '../Action'

import * as MessageAcks from '../Socket/Saga'

import API from '../Api'

/**
 * Saga for sending user message
 */
export function* sendMessage({ data: request }) {
  yield put(ChatAction.chatSendRequest())

  try {
    yield API.gateway.post(
      API.routes.chat.index(),
      request,
    )

    yield put(ChatAction.chatSendSuccess())
  } catch (err) {
    yield put(ChatAction.chatSendFailure({
      message: err.response.data.error.detail
    }))
  }
}

/**
 * Saga for getting all chat messages
 */
export function* getChatMessages({ data: { isPageRequest } }) {
  if (isPageRequest)
    yield put(ChatAction.chatMessagePageRequest())
  else
    yield put(ChatAction.chatMessageRequest())

  try {
    const { data: { data } } = yield API.gateway.get(
      API.routes.chat.index(),
    )

    yield fork(MessageAcks.flowMessage)

    yield put(ChatAction.chatMessageSuccess(data))
  } catch (err) {
    yield put(ChatAction.chatMessageFailure({
      message: err.response.data.error.detail
    }))
  }
}