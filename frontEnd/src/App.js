import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ModalFooter} from 'react-bootstrap';

import Nav from './components/Nav';
import MainNavigation from './components/MainNavigation';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Placeholder from "./components/placeholder";
import Homepage from "./components/Homepage";



import Login from "./components/registeration/login";
import Signup from "./components/registeration/signup";
import AboutUs from "./components/AboutUs";
import Maindashboard from "./components/Maindashboard"
import UserDashboard from "./components/customers/UserDashboard";
import ProfessionalDashboard from "./components/professional/professionalDashboard";
import Cal from "./components/customers/Calendar";
import React from "react";
function App() {
  return (
      <Router>

          {/*<Nav style={{color: 'black', fontSize: '200%'}}/>*/}
          <MainNavigation/>
          <Switch>

              <Route path="/" exact component={Homepage}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/about" exact component={AboutUs}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/dashboard" exact component={Maindashboard}/>

              <Route path="/ud" exact component={UserDashboard}/>
              <Route path="/pd" exact component={ProfessionalDashboard}/>
              <Route path="/cal" exact component={Cal}/>
              <Route path={"/placeholder"} exact component={Placeholder} />




          </Switch>

          <ModalFooter style={{fontSize: '70%', borderColor: 'white', color: 'grey', backgroundColor: 'lightblue'}}>Copyright group #6 Indiana University CSCI-P 565</ModalFooter>


      </Router>
  );
}

export default App;
