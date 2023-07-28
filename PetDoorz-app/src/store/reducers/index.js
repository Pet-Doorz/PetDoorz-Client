import { combineReducers } from "redux";
import hotelReducer from "./hotelReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers ({
    hotel: hotelReducer,
    user: userReducer
})

export default rootReducer