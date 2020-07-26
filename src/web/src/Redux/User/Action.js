import UserActionType from './ActionType'

export default {
  userLogin: (data) => ({ type: UserActionType.USER_LOGIN, data }),
  userLoginRequest: () => ({ type: UserActionType.USER_LOGIN_REQUEST }),
  userLoginSuccess: () => ({ type: UserActionType.USER_LOGIN_SUCCESS }),
  userLoginFailure: (data) => ({ type: UserActionType.USER_LOGIN_FAILURE, data }),
  userToken: (data) => ({ type: UserActionType.USER_TOKEN, data }),
  userTokenRequest: () => ({ type: UserActionType.USER_TOKEN_REQUEST }),
  userTokenPageRequest: () => ({ type: UserActionType.USER_TOKEN_PAGEREQUEST }),
  userTokenSuccess: (data) => ({ type: UserActionType.USER_TOKEN_SUCCESS, data }),
  userTokenFailure: (data) => ({ type: UserActionType.USER_TOKEN_FAILURE, data }),
  userLogout: (data) => ({ type: UserActionType.USER_LOGOUT, data }),
  userLogoutRequest: () => ({ type: UserActionType.USER_LOGOUT_REQUEST }),
  userLogoutSuccess: () => ({ type: UserActionType.USER_LOGOUT_SUCCESS }),
  userLogoutFailure: (data) => ({ type: UserActionType.USER_LOGOUT_FAILURE, data }),
}
