// Redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

// reducers
import { app } from './reducers/index';

// storage
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
	key: 'root',
	storage,
	debug: true,
};

export const ConfigureStore = () => {
	const store = createStore(persistCombineReducers(config, { app }), applyMiddleware(thunk));

	const persistor = persistStore(store);

	return { persistor, store };
};
