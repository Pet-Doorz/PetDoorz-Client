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

export const registerAdmin = (payload) => {
    return async () => {
        try {
            const { email, password, name, location,
                logoHotel, description, address, phoneNumber, images } = payload;
                const { data } = await axios({
                    method: "post",
                    url: baseUrl + "/register",
                    data: { email, password, name, location,
                        logoHotel, description, address, phoneNumber, images }
                });

                return data;
        } catch (error) {
            throw error
        }
    }
}

export const detailAdmin = (access_token) => {
    return async (dispatch) => {
        try {
            if (!access_token) {
                access_token = await AsyncStorage.getItem('admin_access_token')
            }
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

export const editRoom = (payload, id) => {
    return async(dispatch) => {
        try {
            const access_token = await AsyncStorage.getItem('admin_access_token')
            const { name, description, capacity, price, imageUrl } = payload
            const { data } = await axios({
                method: "put",
                url: baseUrl + "/rooms/" + id,
                headers: { access_token },
                data: { name, description, capacity, price, imageUrl }
            })
            console.log(data)
            return data
        } catch (error) {
            throw error
        }
    }
}

export const deleteRoom = (id) => {
    return async(dispatch) => {
        try {
            const access_token = await AsyncStorage.getItem('admin_access_token')
            const { data } = await axios({
                method: "delete",
                url: baseUrl + "/rooms/" + id,
                headers: { access_token },
            })
            console.log(data)
            return data
        } catch (error) {
            throw error
        }
    }
}

export const postNewService = (payload) => {
    return async(dispatch) => {
        try {
            const access_token = await AsyncStorage.getItem('admin_access_token')
            const { name, price } = payload
            const { data } = await axios({
                method: "post",
                url: baseUrl + "/services",
                headers: { access_token },
                data: { name, price }
            })
            return data
        } catch (error) {
            throw error
        }
    }
}

export const editService = (payload, id) => {
    return async(dispatch) => {
        try {
            const access_token = await AsyncStorage.getItem('admin_access_token')
            const { name, price } = payload
            const { data } = await axios({
                method: "put",
                url: baseUrl + "/services/" + id,
                headers: { access_token },
                data: { name, price }
            })
            console.log(data)
            return data
        } catch (error) {
            throw error
        }
    }
}

export const deleteService = (id) => {
    return async() => {
        try {
            const access_token = await AsyncStorage.getItem('admin_access_token')
            const { data } = await axios({
                method: "delete",
                url: baseUrl + "/services/" + id,
                headers: { access_token }
            })
            return data
        } catch (error) {
            throw error
        }
    }
}

export const updateStatusToProcess = (payload) => {
    return async() => {
        try {
            const { id, petImage, access_token } = payload
            const { data } = await axios({
                method: "patch",
                url: BASE_URL + `/bookings/${id}/process`,
                headers: {
                    access_token
                },
                data: {
                    petImage
                }
            })

            return data
        } catch (error) {
            throw error
        }
    }
}