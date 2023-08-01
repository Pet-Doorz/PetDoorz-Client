import {
  SET_BOOKING_DATA,
  SET_CUSTOMER_DATA,
  SET_DETAIL_DATA,
} from "../actions/actionType";

const initialState = {
  customer: {},
  detailCustomer: {},
  booking: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOMER_DATA:
      return {
        ...state,
        customer: action.payload,
      };

    case SET_DETAIL_DATA:
      return {
        ...state,
        detailCustomer: action.payload,
      };
    case SET_BOOKING_DATA:
      return {
        ...state,
        booking: action.payload,
      };
    default:
      return state;
  }
}
