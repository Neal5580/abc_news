import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import NewsReducer from './reducer_news';

/*
* For register reducer
*/
const rootReducer = combineReducers({
  news: NewsReducer,
  form: formReducer
});

export default rootReducer;
