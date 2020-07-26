import { fork, call, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import { ChatAction } from '../Action'

import Socket from '../SocketClient'

function* subscribeMessage() {
  const channel = yield new eventChannel((emit) => {
    Socket.on('chat.message', (result) => {
      return emit(ChatAction.chatLatestMessage(result))
    })

    return () => { }
  })

  return channel
}

function* readMessage() {
  const channel = yield call(subscribeMessage)

  while (true) {
    let action = yield take(channel)

    yield put(action)
  }
}

export function* flowMessage() {
  yield fork(readMessage)
}