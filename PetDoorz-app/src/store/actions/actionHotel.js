import { useDispatch } from "react-redux";
import { SET_HOTEL_DATA, SET_ALL_HOTEL, BASE_URL } from "../actions/actionType";
import axios from "axios";

export const setHotelState = (payload) => {
  return {
    type: SET_HOTEL_DATA,
    payload,
  };
};

export const setAllHotel = (payload) => {
  return {
    type: SET_ALL_HOTEL,
    payload
  }
}

const baseUrl = BASE_URL + `/hotels`;

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

export const getAllHotel = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url:
          baseUrl,
        headers: {
          access_token: "dummy",
        },
      });
      dispatch(setAllHotel(data))
    } catch (error) {
      throw error
    }
  }
}

export const updateStatusHotel = (access_token) => {
  return async () => {
    try {
      const { data } = await axios({
        method: "patch",
        url:
          baseUrl,
        headers: {
          access_token
        },
      });

      return data
    } catch (error) {
      throw error
    }
  }
}