import logo from "./logo.svg";
import "./App.css";

import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

const App = () => {
  return (
    <div className="App">
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Hello world</h1>} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/signup" render={() => <SignUp />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
