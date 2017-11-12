import React from "react";
import PropTypes from "prop-types";
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
      {field.type === "area" && (
        <textarea className="form-control" rows="5" {...field.input} />
      )}
      <div className="help-block">{touched && error}</div>
    </div>
  );
};

const CommentForm = ({ initialized, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="body" component={renderField} label="Content" type="area" />
      {!initialized && (
        <Field
          name="author"
          component={renderField}
          label="Author"
          type="input"
        />
      )}
      <button type="submit" className="btn btn-green">
        {initialized ? "Update Comment" : "Add Comment"}
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  initialized: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CommentForm;
