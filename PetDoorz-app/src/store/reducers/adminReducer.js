import { SET_ADMIN_DATA } from "../actions/actionType";

const initialState = {
  detailAdmin: {}
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_DATA:
      return {
        ...state,
        detailAdmin: action.payload
      }

    default:
      return state;
  }
}
