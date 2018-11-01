import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, GET_STATS } from "../actions/types";

const initialState = {
  stats: {},
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_STATS:
      return {
        ...state,
        stats: action.payload
      };
    default:
      return state;
  }
}
