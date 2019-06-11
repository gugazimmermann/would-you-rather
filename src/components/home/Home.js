import React, { useState } from 'react'
import { connect } from 'react-redux'

import { formatCard } from '../../utils/helpers'
import Appbar from '../appbar/Appbar'
import Question from '../question/Question'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'


const Home = props => {

  const {questionList} = props
  const [tab, setTap] = useState(0)

  const handleChange = (e, newTab) => {
    setTap(newTab)
  }

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      flexGrow: 1,
    },
    tab: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }))
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Appbar menu="Home" />
        <Paper className={classes.paper}>
          <Tabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>
          <div className={classes.tab}>
          {tab === 0 && questionList.map(q => (q.answeredQuestion === null) && (<Question key={q.id} question={q} />)) }
          {tab === 0 && questionList.length === 0 && (<div>There's no questions to show, try to create one.</div>)}
          {tab === 1 && questionList.map(q => (q.answeredQuestion !== null) && (<Question key={q.id} question={q} />)) }
          </div>
        </Paper>
    </Container>
  )
}

const mapStateToProps = ({ users, questions, authedUser }) => {
  const user = Object.keys(users).map(u => users[u]).find(u => u.id === authedUser)

  const questionsArray = Object.keys(questions).map(q => questions[q])
  const questionsSorted = questionsArray.sort((a,b) =>b.timestamp - a.timestamp)
  const formatedQuestions = questionsSorted.map(q => {
    let answeredQuestion = (q.optionOne.votes.findIndex(v => v === user.id) > -1) ? 1
                           : (q.optionTwo.votes.findIndex(v => v === user.id) > -1) ? 2
                           : null
    return formatCard(questions[q.id], users[q.author ], answeredQuestion)
  })
  
  return {
    questionList: formatedQuestions
  }
}

export default connect(mapStateToProps)(Home)