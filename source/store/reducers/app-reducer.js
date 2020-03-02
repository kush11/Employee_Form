import {
  UPDATE_USER_NAME,
  UPDATE_USER_MOBILE,
  UPDATE_USER_EMAIL,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_LOCATION,
  UPDATE_USER_IMAGE,
  RESET_STATE,
} from '../constants/constant';

const initialState = {
  userName: '',
  userEmail: '',
  userImgUrl: '',
  userMobile: '',
  userLocation: {
    latitude: '',
    longitude: '',
  },
  userAddress: '',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    case UPDATE_USER_MOBILE:
      return {
        ...state,
        userMobile: action.payload,
      };
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        userEmail: action.payload,
      };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      };
    case UPDATE_USER_LOCATION:
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    case UPDATE_USER_IMAGE:
      return {
        ...state,
        userImgUrl: action.payload,
      };
    case RESET_STATE:
      return {
        ...state,
        userName: '',
        userEmail: '',
        userImgUrl: '',
        userMobile: '',
        userLocation: {
          latitude: '',
          longitude: '',
        },
        userAddress: '',
      };
    default:
      return state;
  }
};
export default appReducer;
