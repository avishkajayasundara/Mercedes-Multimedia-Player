import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* REDUX */
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import Player from "./components/player";
import Slideshow from "./components/slideshow";
import Login from "./components/login";

import AuthRoute from "./util/authRoute";
import AuthRouteLogged from "./util/authRouteLogged";

axios.defaults.baseURL = "https://smarthack.herokuapp.com";

const token = localStorage.token;

//Check validity of JWT token
if (token) {
  const decodedToken = jwtDecode(token);
  //Check if token is expired
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Fragment>
        <Provider store={store}>
          <Router>
            <Switch>
              <AuthRouteLogged exact path="/" component={Player} />
              <AuthRoute exact path="/login" component={Login} />
            </Switch>
          </Router>
        </Provider>
      </Fragment>
    </div>
  );
}

export default App;
