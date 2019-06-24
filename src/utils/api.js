import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA.js'

export const getInitialData = () => Promise.all([
  _getUsers(),
  _getQuestions()
]).then(([users, questions]) => ({
  users,
  questions
}))

export const getUsers = () => _getUsers()

export const getQuestions = () => _getQuestions()

export const saveQuestion = info => _saveQuestion(info)

export const saveQuestionAnswer = info => _saveQuestionAnswer(info)