import React, { useState } from 'react'
import { connect } from 'react-redux'

import Appbar from '../appbar/Appbar'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

const NewQuestion = props => {

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
    paper: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
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
      <Appbar menu="New Question" />
        <Paper className={classes.paper}>
          
        </Paper>
    </Container>
  )
}

const mapStateToProps = ({ users, authedUser }) => {

  return {
    users: users,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)