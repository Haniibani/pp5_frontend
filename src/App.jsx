import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import styles from "./styles/App.module.css";

import { useCurrentUser } from "./contexts/CurrentUserContext";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/Post";
import PostCreate from "./pages/posts/PostCreate";
import PostEdit from "./pages/posts/PostEdit";

const App = () => {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  // TODO: Remove console.log of profile id
  console.log(profile_id);

  return (
    <div className={styles.App}>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Hello world</h1>} />
          <Route
            exact
            path="/feed"
            render={() => (
              <Posts
                message="No results found. Adjust the search keyword or follow a user."
                filter={``}
              />
            )}
          />
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
