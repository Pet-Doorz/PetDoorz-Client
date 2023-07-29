import { SET_CUSTOMER_DATA } from "../actions/actionType";

const initialState = {
  customer: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER_DATA:
      return {
        customer: action.payload,
      };
    default:
      return state;
  }
}
