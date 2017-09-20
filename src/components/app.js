import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NewsIndex from '../components/news_index';
import NewsSearch from '../components/news_search';
import FeatureNews from '../components/feature_news';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class App extends Component {


  render() {
    const logoUrl = "../src/assets/abc_news_logo.jpg"

    return (
      <div className="container">
        <div className="row header-section">
          <div className="col-md-12">
            <a href="javascript:window.location.href=window.location.href">
              <img src={logoUrl} className="img-responsive center-block" height="120px;"/>
            </a>
          </div>
        </div>
          <hr/>
        <div className="row sort-section">
          <NewsIndex/>
        </div>
          <hr/>
        <div className="row footer-section">
          <p className="footer-name">All Rights Reserved 2017</p>
        </div>
      </div>
    );
  }
}
