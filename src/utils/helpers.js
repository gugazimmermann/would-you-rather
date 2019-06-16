export const formatDate = timestamp => {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export const formatCard = (question, author, answeredQuestion) => {
  const { id, timestamp, optionOne, optionTwo } = question
  const { name, avatarURL } = author

  return {
    id,
    time: formatDate(timestamp),
    title: optionOne.text,
    qty: optionOne.votes.length,
    title2: optionTwo.text,
    qty2: optionTwo.votes.length,
    author: name,
    avatarURL,
    answeredQuestion
  }
}

export const formatLeaderboard = (user, answers) => {
  return {
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    questions: user.questions.length, 
    answers: answers.length,
    total: (answers.length + user.questions.length)
  }
}