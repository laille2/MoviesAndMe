import { createStore } from "redux";
import toggleFavorite from "./Reducers/favoriteReducer";
import setAvatar from "./Reducers/avatarReducer"
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */

const rootPersistConfig = {
    key: 'root',
    storage: storage,
}

const Store = createStore(persistCombineReducers(rootPersistConfig, { toggleFavorite, setAvatar }));

export { Store };