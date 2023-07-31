import { SET_CUSTOMER_DATA } from "../actions/actionType";
import axios from 'axios'

export const SET_ROLE = (payload) => {
  return {
    type: SET_CUSTOMER_DATA,
    payload,
  };
};

const baseUrl = 'https://c08b-2a09-bac5-3a01-18c8-00-278-58.ngrok-free.app/customers'

export const loginCustomer = (payload) => {
  return async () => {
    try {
      const { email, password } = payload
      let { data } = await axios({
        method: 'post',
        url: baseUrl + '/login',
        data: {
          email,
          password
        }
      })

      return data
    } catch (error) {
      throw (error.response.data.message)
    }
  }
}