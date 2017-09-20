import { FETCH_NEWS, FILTER_NEWS, SEARCH_NEWS, FEATURE_NEWS } from '../actions';

import _ from 'lodash';
export let FULL_NEWS;

/*return data to react JS
*and ask react to update UI
*/
export default function (state = {}, action){
  switch (action.type){
    case FETCH_NEWS:
    console.log(action.payload);

      FULL_NEWS = action.payload.items;
      return action.payload.items;

    case FILTER_NEWS:
      return action.payload;

    case SEARCH_NEWS:
      return action.payload;

    case FEATURE_NEWS:
      return action.payload;

    default:
      return state;
  }
}
