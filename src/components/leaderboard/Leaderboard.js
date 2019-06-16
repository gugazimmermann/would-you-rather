import React from 'react'
import { connect } from 'react-redux'

import Appbar from '../appbar/Appbar'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { formatLeaderboard } from '../../utils/helpers';

const Leaderboard = props => {

  const {users} = props

  const useStyles = makeStyles(theme => ({
    paper: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    card: {
      width: 360,
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center'
    },
    avartar: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },
    avatarImg: {
      width: '64px',
      height: '64px'
    },
    points: {
      height: 120,
      flex: 2,
      display: 'flex',
      flexDirection: 'column',  
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      alignContent: 'space-around'
    },
    pointsRow: {
      width: '100%',
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    total: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },
    totalValueBack: {
      backgroundColor: theme.palette.secondary.dark,
      padding: theme.spacing(2),
      height: 50,
      width: 50,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing(1)
    },
    totalValue: {
      color: 'white'
    }
  }))
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Appbar menu="Leaderboard" />
        <Paper className={classes.paper}>
          {users.map(u =>
            <Card className={classes.card} key={u.id}>
              <div className={classes.avartar}>
                <Avatar alt={u.name} src={`${process.env.PUBLIC_URL}/imgs/${u.avatarURL}`} className={classes.avatarImg} />
              </div>
              <div className={classes.points}>
                <div className={classes.pointsName}>
                  <Typography variant="h6" color="textPrimary" component="h6">{u.name}</Typography>
                </div>
                <div className={classes.pointsRow}>
                  <Typography variant="body2" color="textSecondary" component="p">Questions Asked:</Typography>
                  <Typography variant="body2" color="textSecondary" component="p" align="center">{u.questions}</Typography>
                </div>
                <div className={classes.pointsRow}>
                  <Typography variant="body2" color="textSecondary" component="p">Questions Answered:</Typography>
                  <Typography variant="body2" color="textSecondary" component="p">{u.answers}</Typography>
                </div>
              </div>
              <div className={classes.total}>
                <Typography variant="body1" color="textPrimary" component="p">Score</Typography>
                <div className={classes.totalValueBack}>
                  <Typography variant="h6" color="textSecondary" component="p" className={classes.totalValue}>{u.total}</Typography>
                </div>
              </div>
            </Card>
          )}
        </Paper>
    </Container>
  )
}

const mapStateToProps = ({ users }) => {
  let usersArray = Object.keys(users).map(k => users[k])
  let formatUsers = usersArray.map(user => {
    let answers = Object.keys(user.answers).map(k => user.answers[k])
    return formatLeaderboard(user, answers)
  })
  formatUsers.sort((a, b) => b.total - a.total)
  return {
    users: formatUsers
  }
}

export default connect(mapStateToProps)(Leaderboard)