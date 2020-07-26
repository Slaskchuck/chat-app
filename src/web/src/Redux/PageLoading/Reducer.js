export default {
  initialState: [],
  reducer: (state = [], action) => {
    const { type } = action
    const matches = /(.*)_(PAGEREQUEST|SUCCESS|RESETLOADING)/.exec(type)

    if (!matches)
      return state

    const [, requestName, requestState] = matches

    switch (requestState) {
      case 'PAGEREQUEST':
        return [
          ...state,
          requestName,
        ]
      case 'SUCCESS':
        return [...state.filter((value) => value !== requestName)]
      case 'RESETLOADING':
        return []
      default:
        return state
    }
  },
}