import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateScreen from "./components/screens/PrivateScreen"
import LoginScreen from "./components/screens/LoginScreen"
const App = () => {
  return (
    <Router>
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={PrivateScreen} />
        <Route exact path="/login" component={LoginScreen} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
