import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Placeholder from "./components/placeholder";
import Homepage from "./components/Homepage";

import Login from "./components/registeration/login";
import Signup from "./components/registeration/signup";

function App() {
  return (
      <Router>

          <Nav/>
          <Switch>

              <Route path="/" exact component={Homepage}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/about" exact component={Placeholder}/>
              <Route path="/signup" exact component={Signup}/>




          </Switch>


      </Router>
  );
}

export default App;
