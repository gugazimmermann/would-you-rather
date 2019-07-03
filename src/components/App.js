import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import theme from '../utils/mui-theme'
import { handleInitialData, handleAuthedUser } from '../actions'
import Login from './Login'
import Home from './Home'
import QuestionDetails from './QuestionDetails'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'

class App extends Component {

  componentDidMount() {
    const {onHandleInitialData, authedUser, onHandleAuthedUser} = this.props
    document.title="Would You Rather"
    onHandleInitialData()
    if (authedUser) onHandleAuthedUser(authedUser)
  }

  render() {
    const {loading, authedUser} = this.props
    return (
      <Router>  
        <Fragment>
          <LoadingBar style={{backgroundColor: theme.palette.secondary.main, height: '20px', position: 'absolute'}} />
          {loading === true
            ? null
            : !authedUser
              ? <Route component={Login} />
              : <div>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/questions/:question_id' component={QuestionDetails} />
                  <Route exact path='/leaderboard' component={Leaderboard} />
                  <Route exact path='/add' component={NewQuestion} />
                </div>
          }
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({users, questions}) => {
  return {
    loading: (Object.keys(users).length === 0 || Object.keys(questions).length === 0) ? true : false,
    authedUser: localStorage.getItem("AUTHED_USER") || null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleInitialData: () => dispatch(handleInitialData()),
    onHandleAuthedUser: (authedUser) => dispatch(handleAuthedUser(authedUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
