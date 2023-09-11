import { createStore, applyMiddleware, AnyAction, combineReducers } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import treesReducer from './trees-reducer';

const rootReducer = combineReducers({
  trees: treesReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export default store;
