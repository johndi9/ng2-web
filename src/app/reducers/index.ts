import { combineReducers, ActionReducer, State } from '@ngrx/store';
import { global as globalReducer } from './global';
import { home as homeReducer } from './home';

const productionReducer: ActionReducer<State<any>> = combineReducers({
  global: globalReducer,
  home: homeReducer
});

export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}
