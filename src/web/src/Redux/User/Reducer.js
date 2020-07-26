import UserActionType from './ActionType'

const initialState = {
  id: '',
  username: '',
}

export default {
  initialState,
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case UserActionType.USER_TOKEN_SUCCESS:
        return {
          ...state,
          id: action.data.id,
          username: action.data.username,
        }
      case UserActionType.USER_LOGOUT_SUCCESS:
        return {
          ...state,
          id: '',
          username: '',
        }
      default:
        return state
    }
  },
}
