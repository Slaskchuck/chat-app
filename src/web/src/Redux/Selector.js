export const createLoadingSelector = (actions) =>
  (state) =>
    actions.some((action) => state.loading[action])
export const createErrorMessageSelector = (actions) =>
  (state) =>
    actions.map((action) => state.error[action])
      .find((action) => action) || ''
