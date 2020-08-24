export const INIT_LOGIN_STATE = {};

export const R_LOGIN = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    default:
      return state;
  }
}