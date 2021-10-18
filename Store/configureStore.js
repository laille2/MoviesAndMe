import { createStore, combineReducers  } from "redux";
import toggleFavorite from "./Reducers/favoriteReducer";
import setAvatar from "./Reducers/avatarReducer"

const Store = createStore(combineReducers({toggleFavorite, setAvatar}));

export {Store};