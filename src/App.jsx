import logo from "./logo.svg";
import "./App.css";

import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/Post";
import PostCreate from "./pages/posts/PostCreate";
import PostEdit from "./pages/posts/PostEdit";

const App = () => {
  return (
    <div className="App">
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Hello world</h1>} />
          <Route exact path="/posts" render={() => <Posts />} />
          <Route exact path="/posts/create" render={() => <PostCreate />} />
          <Route exact path="/posts/:id" render={() => <Post />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEdit />} />
          <Route exact path="/signin" render={() => <SignIn />} />
          <Route exact path="/signup" render={() => <SignUp />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
