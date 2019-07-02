import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  fab: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function SingleExercise(props) {
  const classes = useStyles();
  const {
    exercise,
    description,
    duration,
    userId,
    exerciseKey
  } = props.exercise;
  const handleEdit = () => {
    props.history.push(
      "/exercise_list/edit_exercise/" + userId + "/" + exerciseKey
    ); //useing template literal is way better
  };
  const handleDelete = () => {
    axios.delete(
      `http:/localhost:8080/dashboard/${userId}/delete/${exerciseKey}`
    );
    props.history.push("dashboard/exercise_list/" + userId);
  };
  return (
    <div>
      <Grid item xs={3} sm={3} md={3}>
        <Paper className={classes.paper}>{exercise}</Paper>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Paper className={classes.paper}>{description}</Paper>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Paper className={classes.paper}>{duration}</Paper>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Paper className={classes.paper}>
          <Fab
            color="secondary"
            aria-label="Edit"
            onClick={handleEdit}
            className={classes.fab}
          >
            <Icon>edit_icon</Icon>
          </Fab>{" "}
          |{" "}
          <Fab
            aria-label="Delete"
            onClick={handleDelete}
            className={classes.fab}
          >
            <DeleteIcon />
          </Fab>
        </Paper>
      </Grid>
    </div>
  );
}
