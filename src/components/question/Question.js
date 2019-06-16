import React from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const Question = (props) => {

    const {question} = props
  
    const handleViewPoll = (e, id) => {
        props.history.push(`/questions/${id}`)
    }

    const useStyles = makeStyles(theme => ({
        card: {
            width: '360px',
            marginBottom: theme.spacing(2)
        },
        cardContent: {
            paddingTop: '0',
            paddingBottom: '0'
        },
        title: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        },
        cardAction: {
            paddingTop: '0'
        }
    }))
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar alt={question.author} src={`${process.env.PUBLIC_URL}/imgs/${question.avatarURL}`} />}
                title={`${question.author} asks:`}
                subheader={question.time}
            />
             <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textSecondary" component="p" align="center">Would You Rather</Typography>
                <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.title}>... {question.title} ...</Typography>
            </CardContent>
            <CardActions  className={classes.cardAction}>
                <Button fullWidth variant="outlined" color="primary" onClick={e => handleViewPoll(e, question.id)}>View Poll</Button>
            </CardActions>
        </Card>
    )
}

export default withRouter(Question)