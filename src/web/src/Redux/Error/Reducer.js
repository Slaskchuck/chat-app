export default {
  initialState: {},
  reducer: (state = {}, action) => {
    const { type, data } = action
    const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

    if (type === 'ERROR_CLEAR')
      return {}

    if (!matches)
      return state

    const [, requestName, requestState] = matches
    return {
      ...state,
      [requestName]: requestState === 'FAILURE' ? data.message : '',
    }
  },
}
