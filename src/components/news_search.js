import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchNews } from '../actions';

class News_Search extends Component{

  /*
  * For render news search form
  */
  renderField(field){
      const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

      return(
        <div className={className}>
          <h5 className="side-bar-title">{field.label}</h5>
          <input className="form-control input-lg search-text"
            type="text"
            {...field.input}
            placeholder="Type here"
          />
          <div className="text-help">
              {field.meta.touched ? field.meta.error : ''}
          </div>
        </div>
      );
    }

    /*
    * Fired when on submit
    */
  onSubmit(values){
      this.props.searchNews(values);
  }

  /*
  * For render search bar
  */
  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Search News:"
            name="title"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-secondary btn-sm center-block sidebar-width">Search</button>
          <hr/>
        </form>

      </div>
    )
  }
}

/*
* For form validation with redux form
*/
function validate(values){
  const errors={};
  if(!values.title){
    errors.title = "Please Enter Keywords!";
  }
  return errors;
}

/*
* For connection between redux, redux form and react
*/
export default reduxForm({
  validate: validate,
  form: 'SearchForm'
})(
  connect(null, { searchNews })(News_Search)
);
