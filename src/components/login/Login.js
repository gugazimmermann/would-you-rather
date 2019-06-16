import React, { useState } from 'react'
import { connect } from 'react-redux'
import { handleAuthedUser } from '../../actions'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

const Login = (props) => {

  const {usersList, onHandleAuthedUser} = props
  const [authedUser, setAuthedUser] = useState("")  

  const handleListItemClick = (e, id) => {
    setAuthedUser(id)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.history.push("/")
    onHandleAuthedUser(authedUser)
  }

  const useStyles = makeStyles((theme) => ({
    card: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    logo: {
      maxWidth: '128px'
    },
    form: {
      width: '100%'
    },
    list: {
      width: '100%'
    }
  }))
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.card}>
        <img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="logo" className={classes.logo} />
        <Typography color="primary" component="h1" variant="h4">Would You Rather</Typography>
        <Typography color="textPrimary" component="h2" variant="h6">Who are you?</Typography>
        <form className={classes.form} noValidate>
          <List className={classes.list}>
            {usersList.map(user => 
              <ListItem key={user.id} button selected={authedUser === user.id} onClick={e => handleListItemClick(e, user.id)}>
                <ListItemAvatar>
                  <Avatar alt={user.name} src={`${process.env.PUBLIC_URL}/imgs/${user.avatarURL}`} />
                </ListItemAvatar>
                <ListItemText id={user.id} primary={user.name} />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" checked={authedUser === user.id} onClick={e => handleListItemClick(e, user.id)} />
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
          <Button type="submit" fullWidth variant="contained" color="primary" onClick={e => handleSubmit(e)}>Sign In</Button>
        </form>
      </Card>
    </Container>
  )
}

const mapStateToProps = ({ users }, props) => {
  return {
    props: props,
    usersList: Object.keys(users).map(u => users[u]).sort((a, b) => a.name.localeCompare(b.name))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleAuthedUser: (authedUser) => dispatch(handleAuthedUser(authedUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
