import { useDispatch } from "react-redux";
import { SET_HOTEL_DATA } from "../actions/actionType";
import axios from "axios";

export const setHotelState = (payload) => {
  return {
    type: SET_HOTEL_DATA,
    payload,
  };
};

const baseUrl = `https://30d3-103-195-58-68.ngrok-free.app/hotels`;

export const getFilteredHotel = (query) => {
  return async (dispatch) => {
    try {
      const { distance, long, lat, checkin, checkout, totalPet } = query;
      console.log(query);
      const { data } = await axios({
        method: "get",
        url:
          baseUrl +
          (query
            ? `?distance=${distance}&long=${long}&lat=${lat}&checkin=${checkin}&checkout=${checkout}&totalPet=${totalPet}`
            : ""),
        headers: {
          access_token: "dummy",
        },
      });
      console.log(data);
      dispatch(setHotelState(data));
    } catch (error) {
      console.log("Error fetching hotels:", error);
    }
  };
};
