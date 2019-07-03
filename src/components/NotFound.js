import React from 'react'
import { connect } from 'react-redux'
import Appbar from './Appbar'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const NotFound = props => {

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
    paper: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }))
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Appbar />
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h1" align="center">Not Found</Typography>
          <br />
          <Typography variant="body1" component="h2" align="center">Sorry, we can't found the question that you are looking for</Typography>
        </Paper>
    </Container>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(NotFound)