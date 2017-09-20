import axios from 'axios';
import _ from 'lodash';
export const FETCH_NEWS = 'fetch_news';
export const FILTER_NEWS = 'filter_news';
export const SEARCH_NEWS = 'search_news';
export const FEATURE_NEWS = 'feature_news';


import { FULL_NEWS } from '../reducers/reducer_news';

const ROOT_URL = 'http://api.rss2json.com/v1/api.json?rss_url=http://www.abc.net.au/news/feed/51120/rss.xml';

/*
* For request ABC News API
*/
export function fetchNews(){
  const request = axios.get(`${ROOT_URL}`);
  /*return{
    type: FETCH_NEWS,
    payload: request//pass data to reducer via middlewave
  };*/

  //using redux trunk to make asyn connect.
  return (dispatch) => {
    request.then(({data}) =>{
      console.log(request);
      console.log(data);
      dispatch({type: FETCH_NEWS,
                payload: data})
    });
  };
}

/*
* For filter ABC News by Tags
*/
export function filterNews(search_words){
  let result_news = [];
  if (search_words == 'all'){
    result_news = FULL_NEWS;
  }
  else{
    result_news = FULL_NEWS.filter(function(item){
      return (item.categories.indexOf(search_words) > -1);
    });
  }
  console.log(result_news);

  return{
    type: FILTER_NEWS,
    payload: result_news//pass data to reducer via middlewave
  };
}


/*
* For search ABC News by keywords
*/
export function searchNews(values){
  let result_news = [];

  result_news = FULL_NEWS.filter(function(item){
    return (item.content.toUpperCase().includes(values.title.toUpperCase())
        || item.title.toUpperCase().includes(values.title.toUpperCase())
        || item.description.toUpperCase().includes(values.title.toUpperCase()));
  });

  if(result_news.length == 0){
    alert("Please Try Again!\n\nWe couldn't find anything matching your search criteria.  ");
    result_news = FULL_NEWS;
  }

  return{
    type: SEARCH_NEWS,
    payload: result_news
  };
}

/*
* For select featured ABC News
*/
export function featureNews(){
  const request = FULL_NEWS;
  let randomElement = _.sample(FULL_NEWS);
  return{
    type: FEATURE_NEWS,
    payload: randomElement//pass data to reducer via middlewave
  };
}
