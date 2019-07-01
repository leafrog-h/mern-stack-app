import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleExercise from './single_exercise'


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

export default function ExerciseList(props) {
    const classes = useStyles()
    const userId = this.props.match.params.id
    const [exercises, setExercises] = useState([])
    useEffect(() => axios.get('http:/localhost:8080/exercrse_list/' + userId)
                    .then(res => setExercises(res.data)))
    return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {exercises.map(exercise =>
            (
                <SingleExercise key={exercise.exerciseKey} exercise={exercise} />
        ))}
      </Grid>
    </div>
    )
}
