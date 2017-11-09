import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Field } from "redux-form";

const renderField = field => {
  const { meta: { touched, error } } = field;

  const className = `form-group ${touched && error && "has-error"}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      {field.type === "input" && (
        <input className="form-control" type="text" {...field.input} />
      )}
      {field.type === "select" && (
        <select className="form-control" {...field.input}>
          <option value="none" disabled>
            Select category
          </option>
          {Object.keys(field.options).map(categoryId => (
            <option key={categoryId} value={categoryId}>
              {field.options[categoryId]}
            </option>
          ))}
        </select>
      )}
      {field.type === "area" && (
        <textarea className="form-control" rows="10" {...field.input} />
      )}
      <div className="help-block">{touched && error}</div>
    </div>
  );
};

const PostForm = ({ categories, handleSubmit, initialized }) => {
  return (
    <div className="container">
      <h1 className="text-center">{initialized ? "Edit Post" : "New Post"}</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          component={renderField}
          label="Title"
          type="input"
        />
        {!initialized && (
          <Field
            name="author"
            component={renderField}
            label="Author"
            type="input"
          />
        )}
        {!initialized && (
          <Field
            name="category"
            component={renderField}
            label="Category"
            type="select"
            options={categories}
          />
        )}
        <Field name="body" component={renderField} label="Body" type="area" />
        <button type="submit" className="btn btn-green">
          {initialized ? "Update" : "Save"}
        </button>
        <Link className="btn btn-gray ml-2" to="/">
          Cancel
        </Link>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  categories: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired
};

export default PostForm;
