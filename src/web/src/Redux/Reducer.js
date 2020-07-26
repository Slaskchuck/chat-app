import { combineReducers } from 'redux'

import PageLoadingReducer from './PageLoading/Reducer'
import LoadingReducer from './Loading/Reducer'
import ErrorReducer from './Error/Reducer'
import UserReducer from './User/Reducer'
import ChatReducer from './Chat/Reducer'

const initialState = {
  pageLoading: PageLoadingReducer.initialState,
  loading: LoadingReducer.initialState,
  error: ErrorReducer.initialState,
  user: UserReducer.initialState,
  chat: ChatReducer.initialState,
}

export default {
  initialState,
  reducer: combineReducers({
    pageLoading: PageLoadingReducer.reducer,
    loading: LoadingReducer.reducer,
    error: ErrorReducer.reducer,
    user: UserReducer.reducer,
    chat: ChatReducer.reducer,
  }),
}