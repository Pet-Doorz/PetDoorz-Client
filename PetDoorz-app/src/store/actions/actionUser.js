import { SET_USER_LOCATION, SET_USER_ROLE } from "./actionType"

export const SET_ROLE = (role) => {
    return {
        type: SET_USER_ROLE,
        payload: role
    }
}

export const SET_LOCATION = (payload) => {
    return {
        type: SET_USER_LOCATION,
        payload
    }
}