import { SET_USER_DETAIL } from "../actionTypes/actionTypes";

const initialState = {
  authorizationToken: '',
  email: '',
  client: '',
  accessToken: ''
};

const userReducer = (state = initialState, action) => {
  console.log(state);
  if (action.type === SET_USER_DETAIL) {
    console.log("Reducer called2");
    return {
      ...state,
      authorizationToken: action.data?.authorizationToken,
      email: action.data?.email,
      client: action.data?.client,
      accessToken: action.data?.accessToken
    }
  }
  return state
};

export default userReducer;
