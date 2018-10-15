import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import playListReducer from "./playlistReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  playlist: playListReducer
});
