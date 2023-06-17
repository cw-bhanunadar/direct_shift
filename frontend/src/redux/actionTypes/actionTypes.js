export const SET_USER_DETAIL = 'SET_USER_DETAIL'

export const setUserDetails = (data) => {
  return {
    type: SET_USER_DETAIL,
    data: data,
  }
}