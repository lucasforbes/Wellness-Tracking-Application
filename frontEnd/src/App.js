import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import Nav from './components/Nav';
import MainNavigation from './components/MainNavigation';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Placeholder from "./components/placeholder";
import Homepage from "./components/Homepage";
import ContactUs from "./components/registeration/ContactUs";
import HomePageMainCard from "./components/registeration/HomePageMainCard";

import Login from "./components/registeration/login";
import Signup from "./components/registeration/signup";

import Maindashboard from "./components/Maindashboard";

function App() {
  return (
      <Router>

          {/*<Nav style={{color: 'black', fontSize: '200%'}}/>*/}
          <MainNavigation/>
          <Switch>

              <Route path="/" exact component={Homepage}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/about" exact component={Placeholder}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/dashboard" exact component={Maindashboard}/>


          </Switch>


      </Router>
  );
}

export default App;
