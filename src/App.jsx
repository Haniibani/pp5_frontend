import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Container>
        <Switch>
          <Route path="/" render={() => <h1>Hello world</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
