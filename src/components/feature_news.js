import React, { Component } from 'react';
import { connect } from 'react-redux';
import { featureNews } from '../actions';
import _ from 'lodash';
import { FULL_NEWS } from '../reducers/reducer_news';

class FeatureNews extends Component {
  /*
  * Constructor
  */
  constructor(props){
    super(props);
  }

  /*
  * For select random news
  */
  selectFeatureNews(){
    if (!FULL_NEWS){
      return <div> Loading... </div>;
    }
    const arr = Array.from(FULL_NEWS);
    let featureNew = arr[Math.floor(Math.random()*arr.length)];
    return featureNew;
  }

  createMarkup(desc) {
    return {__html: desc};
  }

  /*
  * For render feature news items
  */
  renderFeatureNews(){
    let item = this.selectFeatureNews();
    if(!item){
      return <div> Loading... </div>;
    }
    let imageUrl = item.thumbnail;
    let description = item.description;
    if(imageUrl == ''){
      imageUrl = '../src/assets/notfound.png';
    }
    return(
      <li className="list-group-item">
        <div>
        <div><a href={item.link} target="_blank"><img src={imageUrl} className="img-responsive center-block" width="140px"/></a></div>

        <div className="feature-news-title"><a href={item.link} target="_blank"><p className="text-uppercase news-title ">{item.title}</p></a></div>

        <div><p className="text-center-small news-desc-text" dangerouslySetInnerHTML={this.createMarkup(description)}></p></div>
        </div>
        <hr/>
      </li>
    )
  }

  /*
  * For filter ABC News by Tags
  */
  render() {
    let imageUrl = '../src/assets/notfound.png';
    return (
      <div className="feature-section">
        <ul className="list-group">
        <h5 className="feature-name">You May Also Like:</h5>
          {this.renderFeatureNews()}
        </ul>
      </div>
    );
  }
}

/*
* For Map State to Props
*/
function mapStateToProps(state){
  return {news: state.news};
}

/*
* For connect react to redux
*/
export default connect(mapStateToProps, {featureNews})(FeatureNews);
