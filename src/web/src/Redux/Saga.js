import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import UserActionType from './User/ActionType'
import * as UserSaga from './User/Saga'

import ChatActionType from './Chat/ActionType'
import * as ChatSaga from './Chat/Saga'

const user = [
  takeLatest(UserActionType.USER_LOGIN, UserSaga.userLogin),
  takeLatest(UserActionType.USER_TOKEN, UserSaga.getUserByToken),
  takeLatest(UserActionType.USER_LOGOUT, UserSaga.userLogout),
]

const chat = [
  takeLatest(ChatActionType.CHAT_MESSAGE, ChatSaga.getChatMessages),
  takeEvery(ChatActionType.CHAT_SEND, ChatSaga.sendMessage),
]

export default function* rootSaga() {
  yield all([
    ...user,
    ...chat,
  ])
}