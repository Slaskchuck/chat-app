export default {
  initialState: {},
  reducer: (state = {}, action) => {
    const { type } = action
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE|PAGEREQUEST)/.exec(type)

    if (!matches)
      return state

    const [, requestName, requestState] = matches
    return {
      ...state,
      [requestName]: requestState === 'REQUEST' || requestState === 'PAGEREQUEST',
    }
  },
}
