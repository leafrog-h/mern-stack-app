import React from "react";
import "./index.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./Components/Login/login";
import SignupComponent from "./Components/Signup/signup";
import HomePage from "./Components/homepage";
import Dashboard from "/Components/User_Exercise/dashboard";
import ExerciseList from "/Components/User_Exercise/exercise_list";
import EditExercise from "/Components/User_Exercise/exercise_edit";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/signup" component={SignupComponent} />
          <Route path="/dashboard/create_exercise/:id" component={Dashboard} />
          <Route path="/dashboard/exercise_list/:id" component={ExerciseList} />
          <Route
            path="/dashboard/exercise_list/:id/edit_exercise/:exerciseKey"
            component={EditExercise}
          />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
