import * as API from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const getInitialData = () => {
  return API.getInitialData().then(({users, questions}) => {
    return {users, questions}
  })  
}

export const handleAuthedUser = id => {
  return (dispatch) => {
    (id) ? localStorage.setItem("AUTHED_USER", id) : localStorage.removeItem("AUTHED_USER")
    dispatch(setAuthedUser(id))
  }
}

export const handleInitialData = () => {
  return (dispatch) => {  
    dispatch(showLoading())
    return getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(hideLoading())
    })
  }
}

export const saveQuestionAnswer = (info) => {
  return (dispatch) => {  
    return API.saveQuestionAnswer(info).then(() => {
      return getInitialData().then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        return {users, questions}
      })  
    })
  }
}

export const saveNewQuestion = (info) => {
  return (dispatch) => {  
    return API.saveNewQuestion(info).then(() => {
      return getInitialData().then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        return {users, questions}
      })  
    })
  }
}