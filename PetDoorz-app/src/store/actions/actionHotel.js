import { useDispatch } from "react-redux";
import { SET_HOTEL_DATA } from "../actions/actionType";
import axios from "axios";

export const setHotelState = (payload) => {
  return {
    type: SET_HOTEL_DATA,
    payload,
  };
};

const baseUrl = `https://d460-103-195-58-68.ngrok-free.app/hotels`;

export const getFilteredHotel = (query) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + (query ? `?${query}` : ""),
        headers: {
          access_token: "dummy",
        },
      });
      dispatch(setHotelState(data));
    } catch (error) {
      console.log("Error fetching hotels:", error);
      throw error;
    }
  };
};
