import React, { useState } from 'react'
import { connect } from 'react-redux'
import Appbar from './Appbar'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { saveNewQuestion } from '../actions'

const NewQuestion = props => {

  const {authedUser, onSaveNewQuestion} = props  

  const [question, setQuestion] = useState({
    author: authedUser,
    optionOneText: '',
    optionTwoText: ''
  })
  const [submitButton, setSubmitButton] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitButton(false)
    onSaveNewQuestion(question).then(() => {
      props.history.push(`/`)
    })
  }

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
    },
    card: {
      width: '360px',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    cardContent: {
        paddingTop: '0',
        paddingBottom: '0'
    },
    cardAction: {
      position: 'relative',
      paddingTop: '0'
    },
    title: {
        paddingTop: theme.spacing(1)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -15,
        marginLeft: -15,
    }
  }))
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Appbar menu="New Question" />
        <Paper className={classes.paper}>
          <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                  <Typography variant="h5" component="h1" align="center">Create New Question</Typography>
                  <Typography variant="body1" component="h2" className={classes.title}>Complete the Question:</Typography>
                  <Typography variant="h6" component="h3" className={classes.title}>Would You Rather ...</Typography>
                  <TextField
                    id="answer1"
                    label="Option One"
                    className={classes.textField}
                    value={question.optionOneText || ''}
                    onChange={(e) => setQuestion({...question, optionOneText: e.target.value})}
                    margin="normal"
                  />
                  <Typography variant="h6" component="h4" align="center">OR</Typography>
                  <TextField
                    id="answer2"
                    label="Option Two"
                    className={classes.textField}
                    value={question.optionTwoText || ''}
                    onChange={(e) => setQuestion({...question, optionTwoText: e.target.value})}
                    margin="normal"
                  />
              </CardContent>
              <CardActions  className={classes.cardAction}>
                  <Button fullWidth variant="outlined" color="primary" 
                  disabled={!submitButton || !question.optionOneText || !question.optionTwoText} 
                  onClick={e => handleSubmit(e)}>
                    Submit
                  </Button>
                  {(!submitButton) && <CircularProgress size={24} className={classes.buttonProgress} />}
              </CardActions>
          </Card>
        </Paper>
    </Container>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser: authedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveNewQuestion: (questionInfo) => dispatch(saveNewQuestion(questionInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)