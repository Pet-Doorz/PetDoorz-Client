import axios from "axios"
import { BASE_URL, SET_ADMIN_DATA } from "./actionType"
import AsyncStorage from "@react-native-async-storage/async-storage"

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

export const postNewRoom = (payload) => {
    return async(dispatch) => {
        try {
            const access_token = await AsyncStorage.getItem('admin_access_token')
            const { name, description, capacity, price, imageUrl } = payload
            const { data } = await axios({
                method: "post",
                url: baseUrl + "/rooms",
                headers: { access_token },
                data: { name, description, capacity, price, imageUrl }
            })
            return data
        } catch (error) {
            throw error
        }
    }
}