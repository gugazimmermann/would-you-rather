import React from 'react'
import { connect } from 'react-redux'
import Appbar from '../appbar/Appbar';

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

const Home = (props) => {

  const {dispatch, user} = props

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Appbar menu="Home" />
    </Container>
  )
}

function mapStateToProps ({ authedUser, users }) {
    return {
      user: Object.keys(users).map(u => users[u]).find(u => u.id === authedUser)
    }
  }
  
  export default connect(mapStateToProps)(Home)