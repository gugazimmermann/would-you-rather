import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import { handleAuthedUser } from '../actions/authedUser'

import Login from './login/Login'
import Home from './home/Home'
import QuestionDetails from './question-details/QuestionDetails'

class App extends Component {

  componentDidMount() {
    document.title="Would You Rather"
    this.props.onHandleInitialData()
    if (this.props.authedUser) this.props.onHandleAuthedUser(this.props.authedUser)
  }

  render() {
    return (
      <Router>  
        <Fragment>
          <LoadingBar />
          <div>
          {this.props.loading === true
            ? null
            : !this.props.authedUser
              ? <Route component={Login} />
              : <div>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/questions/:question_id' component={QuestionDetails} />
                </div>
          }
          </div>
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
