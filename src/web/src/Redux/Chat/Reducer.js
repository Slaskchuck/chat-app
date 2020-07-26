import ChatActionType from './ActionType'

const initialState = {
  list: [],
  latest: {},
}

export default {
  initialState,
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case ChatActionType.CHAT_MESSAGE_SUCCESS:
        return {
          ...state,
          list: action.data,
        }
      case ChatActionType.CHAT_LATEST_MESSAGE:
        return {
          ...state,
          latest: action.data,
        }
      default:
        return state
    }
  },
}