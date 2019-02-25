import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cities from '../reducers/cities';
import weather from '../reducers/weather';
import appState from '../reducers/appState';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
        weather,
        cities,
        appState
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;