import React from "react";
import ReactDOM from "react-dom";
//import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import jwtDecode from "jwt-decode";

import reducers from "./reducers/index";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  ClearCurrentProfile
} from "./actions/index";

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//this makes sure that the token, if user is signed in, should make our redux state isAuthenticated a true and user object to filled
if (localStorage.jwtToken) {
  //set the token in header
  setAuthToken(localStorage.jwtToken);
  //decode the token so that we can call our action
  const decode = jwtDecode(localStorage.jwtToken);
  //calling the setcurrentuser action directly from the store
  store.dispatch(setCurrentUser(decode));

  //to logout the user once the token expires we do this
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    //logout user
    store.dispatch(ClearCurrentProfile());
    store.dispatch(logoutUser());
    //redirect to login screen
    window.location.href = "./login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
