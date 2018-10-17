import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
<<<<<<< HEAD
  //applyMiddleware(...middleware)
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
=======
  // applyMiddleware(...middleware)
  compose(
    applyMiddleware(...middleware),
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
>>>>>>> a2f3c5a10805e26c0ea21fa73811bab66222e998
  )
);
export default store;
