import { SET_HOTEL_DATA } from "../actions/actionType";

const initialState = {
  data: [],
  //   {
  //     id: 1,
  //     email: "alpha@mail.com",
  //     password: "alpha",
  //     name: "Alpha Pet Hotel",
  //     address: "Jl. Jakarta",
  //     location: {
  //       type: "Point",
  //       coordinates: [-6.147642181387086, 106.71119003020036],
  //     },
  //     logoHotel: "https://picsum.photos/400/600",
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     email: "alpha@mail.com",
  //     password: "alpha",
  //     name: "Juan Pet Hotel",
  //     address: "Jl. Bandung",
  //     location: {
  //       type: "Point",
  //       coordinates: [-6.147642181387086, 106.71119003020036],
  //     },
  //     logoHotel: "https://picsum.photos/400/600",
  //     status: "active",
  //   },
  //   {
  //     id: 3,
  //     email: "alpha@mail.com",
  //     password: "alpha",
  //     name: "Ringo Pet Hotel",
  //     address: "Jl. Surabaya",
  //     location: {
  //       type: "Point",
  //       coordinates: [-6.147642181387086, 106.71119003020036],
  //     },
  //     logoHotel: "https://picsum.photos/400/600",
  //     status: "active",
  //   },
  //   {
  //     id: 4,
  //     email: "alpha@mail.com",
  //     password: "alpha",
  //     name: "Raymond Pet Hotel",
  //     address: "Jl. Pekanbaru",
  //     location: {
  //       type: "Point",
  //       coordinates: [-6.147642181387086, 106.71119003020036],
  //     },
  //     logoHotel: "https://picsum.photos/400/600",
  //     status: "active",
  //   },
  // ],
};

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOTEL_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
