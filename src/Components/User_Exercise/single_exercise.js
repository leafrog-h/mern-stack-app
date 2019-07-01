import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))

export default function SingleExercise(props) {
    const classes = useStyles()
    const {exercise, description, duration} = props.exercise
    return (
        <div>
            <Grid item xs={6} sm={4} md={4}>
                <Paper className={classes.paper}>{exercise}</Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
                <Paper className={classes.paper}>{description}</Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
                <Paper className={classes.paper}>{duration}</Paper>
            </Grid>
        </div>
    )
}
