import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

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



          </Switch>


      </Router>
  );
}

export default App;
