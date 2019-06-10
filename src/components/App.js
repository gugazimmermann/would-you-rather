import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Login from './login/Login'
import Home from './home/Home'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? null
              : !this.props.authedUser
                ? <Route path='/' component={Login} />
                : <div>
                    <Route exact path='/' component={Home} />
                  </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}) {
  return {
    loading: (Object.keys(users).length === 0 ||Object.keys(questions).length === 0) ? true : false,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(App)
