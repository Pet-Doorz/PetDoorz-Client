import axios from "axios"

const baseUrl = 'https://c08b-2a09-bac5-3a01-18c8-00-278-58.ngrok-free.app/hotels'

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