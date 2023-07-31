import { SET_USER_LOCATION, SET_USER_ROLE } from "../actions/actionType";

const initialState = {
  role: "",
  location: {
    latitude: "",
    longitude: "",
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };

    case SET_USER_LOCATION:
      console.log("masuk before login", action.payload);
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}
