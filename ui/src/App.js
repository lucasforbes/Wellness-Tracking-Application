import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Placeholder from "./components/placeholder";

import Login from "./components/registeration/login";

function App() {
  return (
      <Router>

          <Nav/>
          <Switch>

              <Route path="/" exact component={Placeholder}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/about" exact component={Placeholder}/>



          </Switch>


      </Router>
  );
}

export default App;
