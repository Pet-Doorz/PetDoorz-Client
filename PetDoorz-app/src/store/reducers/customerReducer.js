import { SET_CUSTOMER_DATA, SET_DETAIL_DATA } from "../actions/actionType";

const initialState = {
  customer: {},
  detailCustomer: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER_DATA:
      return {
        ...state,
        customer: action.payload,
      }

    case SET_DETAIL_DATA:
      return {
        ...state,
        detailCustomer: action.payload
      }
    default:
      return state;
  }
}
