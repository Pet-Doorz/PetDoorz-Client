import { combineReducers } from "redux";
import hotelReducer from "./hotelReducer";
import userReducer from "./userReducer";
import customerReducer from "./customerReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  hotel: hotelReducer,
  user: userReducer,
  customer: customerReducer,
  admin: adminReducer
});

export default rootReducer;
