import data from '../json/my-password.json'

export const initialValues = { data: data };

export const reducer = (state, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case 'MODAL_VISIBLE':
      return {
        ...state,
        visible: action.payload.visible,
      }
    default:
      return state;
  }
}