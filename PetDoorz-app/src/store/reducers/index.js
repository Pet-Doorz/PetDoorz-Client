import { combineReducers } from "redux";
import hotelReducer from "./hotelReducer";
import userReducer from "./userReducer";
import customerReducer from "./customerReducer";

const rootReducer = combineReducers({
  hotel: hotelReducer,
  user: userReducer,
  customer: customerReducer,
});

export default rootReducer;
