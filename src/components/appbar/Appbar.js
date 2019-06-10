import React from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../../actions/authedUser'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: theme.spacing(2),
  },
  buttonList: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
  },
  hello: {
    marginRight: theme.spacing(1)
  }
}))

const Appbar = (props) => {

  console.log(props)

  const classes = useStyles()

  const {dispatch, menu, user} = props

  const handleLogout = e => {
      e.preventDefault()
      dispatch(setAuthedUser(""))
    }

  return (
    <AppBar position="static">
      <Toolbar variant="dense">

        <Avatar alt="logo" src={`${process.env.PUBLIC_URL}/imgs/logo.png`} className={classes.logo} />
        <Typography variant="h6" className={classes.title}>Would You Rather</Typography>

        <div className={classes.buttonList}>
          <Button variant="contained" color={menu === "Home" ? "secondary" : "default" } className={classes.button}>Home</Button> 
          <Button variant="contained" color={menu === "New Question" ? "secondary" : "default" } className={classes.button}>New Question</Button>
          <Button variant="contained" color={menu === "l Leader Board" ? "secondary" : "default" } className={classes.button}>Leader Board</Button>
        </div>

        <Typography variant="subtitle1" className={classes.hello}>Hello, {user.name}</Typography>
        <Avatar alt={user.name} src={`${process.env.PUBLIC_URL}/imgs/${user.avatarURL}`} />
        <Button color="inherit" onClick={e => handleLogout(e)}>Logout</Button>

      </Toolbar>
    </AppBar>
  )
}

function mapStateToProps ({ authedUser, users }) {
    return {
      user: Object.keys(users).map(u => users[u]).find(u => u.id === authedUser)
    }
  }
  
  export default connect(mapStateToProps)(Appbar)