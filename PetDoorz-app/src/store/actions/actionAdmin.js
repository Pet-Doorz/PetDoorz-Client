import axios from "axios"
import { BASE_URL, SET_ADMIN_DATA } from "./actionType"

const baseUrl = BASE_URL + '/hotels'

const SET_DETAIL_ADMIN = (payload) => {
    return {
        type: SET_ADMIN_DATA,
        payload
    }
}

export const loginAdmin = (payload) => {
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
    }
}

export const detailAdmin = (access_token) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                url: baseUrl + '/detail',
                headers: { access_token },
            });

            dispatch(SET_DETAIL_ADMIN(data));
        } catch (error) {
            throw error.response.data.message;
        }
    }
}