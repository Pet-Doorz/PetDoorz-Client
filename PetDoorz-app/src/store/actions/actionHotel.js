import { useDispatch } from "react-redux";
import { SET_HOTEL_DATA } from "../actions/actionType";
import axios from "axios";

export const setHotelState = (payload) => {
  return {
    type: SET_HOTEL_DATA,
    payload,
  };
};

const baseUrl = `https://7b70-2001-448a-4001-b897-ade7-5f21-563a-6a1a.ngrok-free.app/hotels`;

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
