import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import Reducer from './Reducer'
import Saga from './Saga'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = composeWithDevTools({ trace: true })
    return composeEnhancers(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

/**
 * Store
 *
 * @param {object} initial_state Reducer Initial State
 *
 * @return {object} store object
 */
export default function initializeStore(initial_state = Reducer.initial_state) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    Reducer.reducer,
    initial_state,
    bindMiddleware([sagaMiddleware]),
  )

  store.sagaTask = sagaMiddleware.run(Saga)

  return store
}