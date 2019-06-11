import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { formatCard } from '../../utils/helpers'
import * as API from '../../utils/api'
import { handleGetQuestions } from '../../actions/shared'
import Appbar from '../appbar/Appbar'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

const QuestionDetails = (props) => {

    const {question, authedUser, onSaveQuestionAnswer} = props  
    const [value, setValue] = useState('')
    const [submitButton, setSubmitButton] = useState(true)

    function handleChange(event) {
        setValue(event.target.value)
    }

    const handleViewPoll = (e, question) => {
        setSubmitButton(false)
        API.saveQuestionAnswer({ authedUser: authedUser, qid: question, answer: (value === "1") ? "optionOne" : "optionTwo" })
        onSaveQuestionAnswer().then(res => {
            setSubmitButton(true)
        })
    }

    const useStyles = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(3),
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        card: {
            width: 360,
            marginBottom: theme.spacing(2)
        },
        cardContent: {
            paddingBottom: theme.spacing(2)
        },
        title: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        },
        cardAction: {
            paddingTop: '0'
        },
        badge: {
            width: '100%'
        },
        box: {
            width: '100%'
        }
    }))
    
    const StyledBadge = withStyles(theme => ({
        badge: {
            top: 0,
            right: 25,
            border: `2px solid`,
            padding: '10px'
        }
    }))(Badge)
    const classes = useStyles()

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Appbar />
            <Paper className={classes.paper}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={<Avatar alt={question.author} src={`${process.env.PUBLIC_URL}/imgs/${question.avatarURL}`} />}
                        title={`${question.author} asks:`}
                        subheader={question.time}
                    />

                    {question.answeredQuestion === null && (
                    <div>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.title}>Would You Rather</Typography>
                        <RadioGroup aria-label="Question" name="question"  className={classes.group} value={value} onChange={handleChange}>
                            <FormControlLabel value="1" control={<Radio />} label={question.title} />
                            <FormControlLabel value="2" control={<Radio />} label={question.title2} />
                        </RadioGroup>
                    </CardContent>
                    <CardActions  className={classes.cardAction}>
                        <Button fullWidth variant="contained" color="secondary" disabled={!submitButton || !value} onClick={e => handleViewPoll(e, question.id)}>Submit</Button>
                    </CardActions>
                    </div>
                    )}

                    {question.answeredQuestion !== null && (
                    <CardContent>
                        {question.answeredQuestion === 1 && (
                        <div>
                        <StyledBadge color="secondary" badgeContent={"Your Vote"} invisible={false} className={classes.badge}>
                            <Box bgcolor="primary.light" color="primary.contrastText" borderColor="primary.main" border={2} borderRadius={8} mb={2} p={2} className={classes.box}>
                                <Typography variant="h6" component="h6" align="center"> Would you rather {question.title}?</Typography>
                                <LinearProgress variant="determinate" color="secondary" value={Math.floor((100 * question.qty) / (question.qty + question.qty2))} />
                                <Typography variant="subtitle1" component="h3" align="center">
                                    {Math.floor((100 * question.qty) / (question.qty + question.qty2))}% - {question.qty} of {question.qty + question.qty2} Votes
                                </Typography>
                            </Box>
                        </StyledBadge>
                        <Box bgcolor={grey[100]} borderColor={grey[500]} border={2} borderRadius={8} p={2}>
                            <Typography variant="h6" component="h6" align="center"> Would you rather {question.title2}?</Typography>
                            <LinearProgress variant="determinate" color="primary" value={Math.floor((100 * question.qty2) / (question.qty + question.qty2))} />
                            <Typography variant="subtitle1" component="h3" align="center">
                                {Math.floor((100 * question.qty2) / (question.qty + question.qty2))}% - {question.qty2} of {question.qty + question.qty2} Votes
                            </Typography>
                        </Box>
                        </div>
                        )}
                        {question.answeredQuestion === 2 && (
                        <div>
                        <Box bgcolor={grey[100]} borderColor={grey[500]} border={2} borderRadius={8} mb={2} p={2}>
                            <Typography variant="h6" component="h6" align="center"> Would you rather {question.title}?</Typography>
                            <LinearProgress variant="determinate" color="primary" value={Math.floor((100 * question.qty) / (question.qty + question.qty2))} />
                            <Typography variant="subtitle1" component="h3" align="center">
                                {Math.floor((100 * question.qty) / (question.qty + question.qty2))}% - {question.qty} of {question.qty + question.qty2} Votes
                            </Typography>
                        </Box>
                        <StyledBadge color="secondary" badgeContent={"Your Vote"} invisible={false} className={classes.badge}>
                            <Box bgcolor="primary.light" color="primary.contrastText" borderColor="primary.main" border={2} borderRadius={8} p={2} className={classes.box}>
                                <Typography variant="h6" component="h6" align="center"> Would you rather {question.title2}?</Typography>
                                <LinearProgress variant="determinate" color="secondary" value={Math.floor((100 * question.qty2) / (question.qty + question.qty2))} />
                                <Typography variant="subtitle1" component="h3" align="center">
                                    {Math.floor((100 * question.qty2) / (question.qty + question.qty2))}% - {question.qty2} of {question.qty + question.qty2} Votes
                                </Typography>
                            </Box>
                        </StyledBadge>
                        </div>
                        )}
                    </CardContent>
                    )}

                </Card>
            </Paper>
        </Container>
    )
}

const mapStateToProps = ({ users, questions, authedUser }, props) => {
    const user = Object.keys(users).map(u => users[u]).find(u => u.id === authedUser)
    const q = questions[props.match.params.question_id]
    const answeredQuestion = (q.optionOne.votes.findIndex(v => v === user.id) > -1) ? 1
                            : (q.optionTwo.votes.findIndex(v => v === user.id) > -1) ? 2
                            : null
    const formatedQuestion = formatCard(questions[q.id], users[q.author], answeredQuestion)
    return { 
        question: formatedQuestion,
        authedUser: authedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveQuestionAnswer: () => dispatch(handleGetQuestions())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionDetails))