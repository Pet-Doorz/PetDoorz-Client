const initialState = {
    data: [{
        "id": 1,
        "email": "alpha@mail.com",
        "password": "alpha",
        "name": "Alpha Pet Hotel",
        "location": {
            "type": "Point",
            "coordinates": [
                -6.147642181387086,
                106.71119003020036
            ]
        },
        "balance": 18000000,
        "logoHotel": "https://picsum.photos/400/600",
        "status": "active"
    }]
}

export default function hotelReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}