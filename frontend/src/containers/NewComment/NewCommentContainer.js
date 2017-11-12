import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import { CommentForm } from "../../components";
import * as commentsActionCreators from "../../redux/modules/comments";

class NewCommentContainer extends Component {
  static propTypes = {
    createAndHandleComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
  };

  onSubmit = values => {
    this.props.createAndHandleComment(
      {
        ...values,
        parentId: this.props.postId
      },
      () => this.props.reset()
    );
  };

  render() {
    return (
      <CommentForm
        initialized={this.props.initialized}
        handleSubmit={this.props.handleSubmit(this.onSubmit)}
      />
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.author) {
    errors.author = "Please enter an author name";
  }
  if (!values.body) {
    errors.body = "Please enter some content";
  }

  return errors;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(commentsActionCreators, dispatch);
};

export default reduxForm({ form: "CommentForm", validate })(
  connect(null, mapDispatchToProps)(NewCommentContainer)
);
