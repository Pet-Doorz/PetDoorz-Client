import {
  SET_BOOKING_DATA,
  SET_CUSTOMER_DATA,
  SET_DETAIL_DATA,
  SET_TOTALPET_DATA,
  SET_CHECKIN_DATA, SET_CHECKOUT_DATA,
  SET_REVIEW_DATA
} from "../actions/actionType";

const initialState = {
  customer: {},
  detailCustomer: {},
  booking: {},
  checkin: '',
  checkout: '',
  totalPet: 0,
  reviews: []
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

    case SET_CHECKIN_DATA:
      return {
        ...state,
        checkin: action.payload
      }

    case SET_CHECKOUT_DATA:
      return {
        ...state,
        checkout: action.payload
      }

    case SET_TOTALPET_DATA:
      return {
        ...state,
        totalPet: action.payload
      }

    case SET_REVIEW_DATA:
      return {
        ...state,
        reviews: action.payload
      }
      
    default:
      return state;
  }
}
