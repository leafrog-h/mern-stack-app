import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import uuid from "uuid";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
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
  const userId = this.props.match.params.id;
  const handleSubmit = e => {
    const exerciseInfo = {
      userId,
      exercise,
      description,
      duration,
      exerciseKey: uuid.v4()
    };
    axios
      .post("http:/localhost:8080/" + userId + "/create", exerciseInfo)
      .then(res => this.props.history.push("/exercise_list/" + userId));
  };
  return (
    <Paper className={classes.root}>
      <FormGroup onSubmit={e => handleSubmit(e)}>
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
          Submit
        </Button>
      </FormGroup>
    </Paper>
  );
}
