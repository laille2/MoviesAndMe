import { createStore } from "redux";
import toggleFavorite from "./Reducers/favoriteReducer";

const Store = createStore(toggleFavorite);

export {Store};