import { SET_BOOKING_DATA } from "./actionType"

const SET_DATA = (payload) => {
    return {
        type: SET_BOOKING_DATA,
        payload
    }
}

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