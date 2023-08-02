import {
  BASE_URL,
  SET_CUSTOMER_DATA,
  SET_DETAIL_DATA,
  SET_CHECKIN_DATA, SET_CHECKOUT_DATA, SET_TOTALPET_DATA
} from "../actions/actionType";
import axios from "axios";

export const SET_ROLE = (payload) => {
  return {
    type: SET_CUSTOMER_DATA,
    payload,
  };
};

const SET_DETAIL = (payload) => {
  return {
    type: SET_DETAIL_DATA,
    payload,
  };
};

export const SET_CHECKIN = (payload) => {
  return {
    type: SET_CHECKIN_DATA,
    payload
  }
}

export const SET_CHECKOUT = (payload) => {
  return {
    type: SET_CHECKOUT_DATA,
    payload
  }
}

export const SET_TOTALPET = (payload) => {
  return {
    type: SET_TOTALPET_DATA,
    payload
  }
}

const baseUrl = BASE_URL + "/customers";

export const loginCustomer = (payload) => {
  return async () => {
    try {
      const { email, password } = payload;
      const { data } = await axios({
        method: "post",
        url: baseUrl + "/login",
        data: {
          email,
          password,
        },
      });

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
};

export const detailCustomer = (access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl,
        headers: { access_token },
      });

      dispatch(SET_DETAIL(data));
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  };
};

export const getMidtrans = (payload) => {
  return async () => {
    try {
      const { access_token, amount } = payload;
      const { data } = await axios({
        method: "post",
        url: baseUrl + "/generate-midtrans-token",
        headers: { access_token },
        data: {
          total: amount,
        },
      });

      return data;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  };
};

export const createBooking = (payload) => {
  return async () => {
    try {
      const {
        RoomId,
        checkIn,
        checkOut,
        totalPet,
        grandTotal,
        bookingServices,
        access_token,
      } = payload;
      const { data } = await axios({
        method: "post",
        url: BASE_URL + "/bookings",
        headers: { access_token },
        data: {
          RoomId,
          checkIn,
          checkOut,
          totalPet,
          grandTotal,
          bookingServices,
        },
      });
      console.log("Success");
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};
