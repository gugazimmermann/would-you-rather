import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../../actions/authedUser'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    maxWidth: '128px'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  list: {
    width: '100%'
  }
}))

const Login = (props) => {

  const classes = useStyles()

  const {dispatch, usersList} = props
  const [checked, setChecked] = useState("")

  const handleListItemClick = (e, id) => {
    setChecked(id)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setAuthedUser(checked))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography color="primary" component="h1" variant="h4">Would You Rather</Typography>
        <img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="logo" className={classes.logo} />
        <form className={classes.form} noValidate>
          <List className={classes.list}>
            {usersList.map(user => 
              <ListItem key={user.id} button selected={checked === user.id} onClick={e => handleListItemClick(e, user.id)}>
                <ListItemAvatar>
                  <Avatar alt={user.name} src={`${process.env.PUBLIC_URL}/imgs/${user.avatarURL}`} />
                </ListItemAvatar>
                <ListItemText id={user.id} primary={user.name} />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" checked={checked === user.id} onClick={e => handleListItemClick(e, user.id)} inputProps={{ 'aria-labelledby': user.id }} />
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
          <Button type="submit" fullWidth variant="contained" color="primary" onClick={e => handleSubmit(e)}>Sign In</Button>
        </form>
      </div>
    </Container>
  )
}

function mapStateToProps ({ users }) {
  return {
    usersList: Object.keys(users).map(u => users[u]).sort((a, b) => a.name.localeCompare(b.name))
  }
}

export default connect(mapStateToProps)(Login)
