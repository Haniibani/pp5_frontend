import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import styles from "./styles/App.module.css";

import NavBar from "./components/NavBar";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/Post";
import PostCreate from "./pages/posts/PostCreate";
import PostEdit from "./pages/posts/PostEdit";
import ProfilePage from "./pages/profiles/Profile";
import ProfileEdit from "./pages/profiles/ProfileEdit";
import UsernameForm from "./pages/profiles/UserPasswordForm";
import UserPasswordForm from "./pages/profiles/UsernameForm";
import NotFound from "./pages/NotFound";

const App = () => (
  <div className={styles.App}>
    <Container className={styles.Main}>
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Posts
              message="No results found. Adjust the search keyword or follow a user."
            />
          )}
        />
        <Route exact path="/posts/create" render={() => <PostCreate />} />
        <Route exact path="/posts/:id" render={() => <Post />} />
        <Route exact path="/posts/:id/edit" render={() => <PostEdit />} />
        <Route exact path="/signin" render={() => <SignIn />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
        <Route
          exact
          path="/profiles/:id/edit"
          render={() => <ProfileEdit />}
        />
        <Route
          exact
          path="/profiles/:id/edit/username"
          render={() => <UsernameForm />}
        />
        <Route
          exact
          path="/profiles/:id/edit/password"
          render={() => <UserPasswordForm />}
        />
        <Route
          render={() => <NotFound />}
        />
      </Switch>
    </Container>
  </div>
);

export default App;
