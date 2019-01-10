import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorsReducers from "./errorsReducers";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducers,
  post: postReducer,
  profile: profileReducer,
  errors: errorsReducers
});
