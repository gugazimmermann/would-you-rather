export const SET_AUTHED_USER = 'SET_AUTHED_USER'

const setAuthedUser = id => {
  return {
    type: SET_AUTHED_USER,
    id,
  } 
}

export const handleAuthedUser = id => {
  return (dispatch) => {
    (id) ? localStorage.setItem("AUTHED_USER", id) : localStorage.removeItem("AUTHED_USER")
    dispatch(setAuthedUser(id))
  }
}
