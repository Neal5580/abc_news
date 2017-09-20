import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews, filterNews, searchNews } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { FULL_NEWS } from '../reducers/reducer_news';
import SearchBar from '../components/news_search';
import FeatureNews from '../components/feature_news';


let checkDate = false;

class NewsIndex extends Component{

  /*
  * Contructor
  */
  constructor(props){
    super(props);
    this.onFormSortByDateLatest = this.onFormSortByDateLatest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderTags = this.renderTags.bind(this);
  }

  /*
  * This function is executed after the first render only
  */
  componentDidMount(){
    this.props.fetchNews();
  }

  createMarkup(desc) {
    return {__html: desc};
  }

  /*
  * For processing news order sorting
  */
  onFormSortByDateLatest(event){
    event.preventDefault();

    if (checkDate){
      let sortDate = this.props.news.sort(function(a, b){
        let dateA = new Date(a.pubDate), dateB=new Date(b.pubDate)
        return dateB-dateA //sort by date asc
      });
      checkDate = false;
    }
    else{
      let sortDate = this.props.news.sort(function(a, b){
        let dateA = new Date(a.pubDate), dateB=new Date(b.pubDate)
        return dateA-dateB //sort by date desc
      });
      checkDate = true;
    }
    this.setState(this.props.news: sortDate);
  }

  /*
  * For rendering news html code
  */
  renderNews(){
    if (!FULL_NEWS){
      return <div> Loading... </div>;
    }
      return _.map(this.props.news, item => {
        let imageUrl = item.thumbnail;
        let description = item.description;
        if(imageUrl == ''){
          imageUrl = '../src/assets/notfound.png';
        }
        return(
          <li className="list-group-item" key={item.title}>
          <div className="row">
            <div className="col-md-4">
              <div className="news-image"><a href={item.link} target="_blank"><img src={imageUrl} className="img-responsive center-block" width="140px"/></a></div>
              <div><p className="news-author">{item.author}</p></div>
              <div><p className="news-date">{item.pubDate}</p></div>
            </div>
            <div className="col-md-8">
              <a href={item.link} target="_blank"><p className="text-uppercase news-title">{item.title}</p></a>
              <hr/>
              <p className="text-center-small" dangerouslySetInnerHTML={this.createMarkup(description)}></p>
            </div>
          </div>
          <hr/>
          </li>
        );
      });
    }

    /*
    * For rendering news date order button
    */
    sortNewsByDateLatest(){
      if (!FULL_NEWS){
        return <div> Loading... </div>;
      }
      return(
        <div className="side-bar-item">
          <form onSubmit={this.onFormSortByDateLatest} >
              <button type="submit" className="btn btn-secondary btn-sm center-block sidebar-width">Click Here</button>
          </form>
        </div>
      )
    }

    /*
    * For handling filter onChange event
    */
    handleChange(event) {
      this.props.filterNews(event.target.value);
     }

     /*
     * For rendering filter tags event
     */
    renderTags(){
      if (!FULL_NEWS){
        return <div> Loading... </div>;
      }
      const arr = Array.from(FULL_NEWS);
      let all_tags = [];
      for (const x of arr) {
        all_tags =  [...all_tags, ...x.categories];
      }
      let unique_tags = [];
      unique_tags = all_tags.reduce((x, y) => x.includes(y) ? x : [...x, y], []);

      return(
        <div className="side-bar-item">
          <form onSubmit={this.handleSubmit}>
            <select onChange={this.handleChange}  className="form-control tags-text-center">
              <option value="" selected disabled hidden>Choose Here</option>
              <option value="all"> All </option>
              {unique_tags.sort().map((item, index) => (
                <option key={index} value={item}> {item}</option>
              ))}
            </select>
          </form>
        </div>
      )
    }

  /*
  * For rendering filter onChange event
  */
  render(){
    return(
      <div>
        <div className="col-md-2 sider-bar-section">
            <h5 className="side-bar-title">Categories:</h5>
            {this.renderTags()}
            <hr/>
            <h5 className="side-bar-title">Sort By Date:</h5>
            {this.sortNewsByDateLatest()}
            <hr/>
            <SearchBar/>
        </div>
        <div className="col-md-7 news-height" >
          <ul className="list-group" id="posts">
            {this.renderNews()}
          </ul>
        </div>
        <div className="col-md-3">
          <FeatureNews/>
        </div>
      </div>
     );
  }
}

/*
* For converting state to props
*/
function mapStateToProps(state){
  return {news: state.news};
}

/*
* For connecting redux reducer and react JS
*/
export default connect(mapStateToProps, { searchNews, fetchNews, filterNews })(NewsIndex);
