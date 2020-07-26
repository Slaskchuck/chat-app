import ChatActionType from './ActionType'

export default {
  chatMessage: (data) => ({ type: ChatActionType.CHAT_MESSAGE, data }),
  chatMessageRequest: () => ({ type: ChatActionType.CHAT_MESSAGE_REQUEST }),
  chatMessagePageRequest: () => ({ type: ChatActionType.CHAT_MESSAGE_PAGEREQUEST }),
  chatMessageSuccess: (data) => ({ type: ChatActionType.CHAT_MESSAGE_SUCCESS, data }),
  chatMessageFailure: (data) => ({ type: ChatActionType.CHAT_MESSAGE_FAILURE, data }),
  chatSend: (data) => ({ type: ChatActionType.CHAT_SEND, data }),
  chatSendRequest: () => ({ type: ChatActionType.CHAT_SEND_REQUEST }),
  chatSendSuccess: (data) => ({ type: ChatActionType.CHAT_SEND_SUCCESS, data }),
  chatSendFailure: (data) => ({ type: ChatActionType.CHAT_SEND_FAILURE, data }),
  chatLatestMessage: (data) => ({ type: ChatActionType.CHAT_LATEST_MESSAGE, data }),
}