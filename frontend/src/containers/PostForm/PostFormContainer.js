import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

const renderField = field => {
  const { meta: { touched, error } } = field;

  const className = `form-group ${touched && error && "has-error"}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input className="form-control" type="text" {...field.input} />
      <div className="help-block">{touched && error}</div>
    </div>
  );
};

class PostFormContainer extends Component {
  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <h1 className="text-center">New Post</h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="title" component={renderField} label="Title" />
          <Field name="author" component={renderField} label="Author" />
          <Field name="category" component={renderField} label="Category" />
          <Field name="body" component={renderField} label="Body" />
          <button type="submit" className="btn btn-green">
            Save
          </button>
          <Link className="btn btn-gray ml-2" to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter a title";
  }
  if (!values.author) {
    errors.author = "Please enter an author name";
  }
  if (!values.category) {
    errors.category = "Please select a category";
  }
  if (!values.body) {
    errors.body = "Please enter some content in the body";
  }

  return errors;
};

export default reduxForm({
  form: "PostForm",
  validate
})(PostFormContainer);
