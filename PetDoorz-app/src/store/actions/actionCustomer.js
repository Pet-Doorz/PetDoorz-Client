import { BASE_URL, SET_CUSTOMER_DATA, SET_DETAIL_DATA } from "../actions/actionType";
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

const baseUrl = BASE_URL + '/customers';

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
      const { access_token, amount } = payload
      const { data } = await axios({
        method: 'post',
        url: baseUrl + '/generate-midtrans-token',
        headers: { access_token },
        data: {
          total: amount
        }
      })

      return data
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
}
