import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Stores from './views/Stores';
import MainPage from './views/MainPage';
import Login from './views/Login';

function App() {

  return (

    <Router>
        <Switch>
          <Route path="/stores">
              <Stores teste={true}/>
          </Route>

          <Route path="/login">
              <Login />
          </Route>

          <Route path="/">
              <MainPage />
          </Route>

                  
        </Switch>
    </Router>
     
  );
}

export default App;
