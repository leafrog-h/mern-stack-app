import React from 'react';
import './index.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './Components/Login/login';
import SignupComponent from './Components/Signup/signup';
import HomePage from './Components/homepage'
import Dashboard from '/Components/dashboard'
import ExerciseList from '/Components/exercise_list'


 const App = () => {
  return (
    <Router>
    <div>
      <Switch>
      <Route path='/' exact component={HomePage}></Route>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard/create_exercise/:id' component={Dashboard}></Route>
      <Route path='/dashboard/exercise_list/:id' component={ExerciseList}></Route>

      </Switch>
    </div>
  </Router>
  )
}
export default App;