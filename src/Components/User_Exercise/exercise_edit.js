import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [exercise, setExercise] = useState("");
  const [description, describe] = useState("");
  const [duration, setDuration] = useState(0);
  const userId = props.match.params.id;
  const exerciseKey = props.match.params.exerciseKey;

  useEffect(() => {
    axios
      .get(`http:/localhost/8080/dashboard/${userId}/edit/${exerciseKey}`)
      .then(res => {
        const { exercise, description, duration } = res.data;
        setExercise(exercise);
        describe(description);
        setDuration(duration);
      });
  }, []);

  const popupModal = () => {};

  const handleUpdate = e => {
    const exerciseInfo = { exercise, description, duration };
    axios
      .patch(
        `http:/localhost/8080/dashboard/${userId}/edit/${exercise}`,
        exerciseInfo
      )
      .then(res => {
        popupModal();
        props.history.push(
          `http:/localhost/8080/dashboard/exercise_list/${userId}`
        );
      });
  };
  return (
    <Paper className={classes.root}>
      <FormGroup onSubmit={e => handleUpdate(e)}>
        <TextField
          label="Exercise"
          className={classes.textField}
          type="text"
          name="exercise"
          autoComplete="Exercise"
          margin="normal"
          variant="outlined"
          onChange={e => setExercise(e.target.value)}
        />
        <TextField
          label="Description"
          className={classes.textField}
          type="text"
          name="description"
          autoComplete="Description"
          margin="normal"
          variant="outlined"
          onChange={e => describe(e.target.value)}
        />
        <TextField
          label="Duration in mins"
          className={classes.textField}
          type="number"
          name="duration"
          autoComplete="duration"
          margin="normal"
          variant="outlined"
          onChange={e => setDuration(e.target.value)}
        />
        <Button variant="contained" type="submit" className={classes.button}>
          Update
        </Button>
      </FormGroup>
    </Paper>
  );
}
