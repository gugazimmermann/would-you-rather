import * as API from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export const handleInitialData = () => {
  return (dispatch) => {  
    dispatch(showLoading())
    return API.getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export const handleGetUsers = () => {
  return (dispatch) => {
    dispatch(showLoading())
    return API.getUsers().then((users) => {
      dispatch(receiveUsers(users))
      dispatch(hideLoading())
    })
  }
}

export const handleGetQuestions = () => {
  return (dispatch) => {
    return API.getQuestions().then((questions) => dispatch(receiveQuestions(questions)))
  }
}
