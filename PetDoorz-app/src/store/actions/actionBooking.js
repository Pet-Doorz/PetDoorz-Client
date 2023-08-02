import axios from "axios"
import { BASE_URL, SET_BOOKING_DATA } from "./actionType"

const SET_DATA = (payload) => {
    return {
        type: SET_BOOKING_DATA,
        payload
    }
}

const baseUrl = BASE_URL + '/bookings'

export const getBookingData = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                url: baseUrl,
                headers: { access_token },
            });

            
        } catch (error) {
            console.log(error.response.data.message);
            throw error.response.data.message;
        }
    }
}

export const createBooking = (payload) => {
    return async () => {
        try {
            const { access_token, checkIn, checkOut, totalPet, grandTotal, RoomId } = payload
            const { data } = await axios({
                method: 'post',
                url: baseUrl,
                headers: {
                    access_token
                },
                data: {
                    checkIn, checkOut, totalPet, grandTotal, RoomId
                }
            })

            return data
        } catch (error) {
            console.log(error.response.data.message);
            throw error.response.data.message;
        }
    }
}