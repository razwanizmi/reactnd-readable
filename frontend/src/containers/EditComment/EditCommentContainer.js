import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import { CommentForm } from "../../components";
import * as commentsActionCreators from "../../redux/modules/comments";

class NewCommentContainer extends Component {
  static propTypes = {
    updateAndHandleComment: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired,
    fetchAndHandleComment: PropTypes.func.isRequired
  };

  onSubmit = values => {
    const { categoryId, postId } = this.props.match.params;

    this.props.updateAndHandleComment(values, () =>
      this.props.history.push(`/${categoryId}/${postId}`)
    );
  };

  componentWillMount() {
    this.props.fetchAndHandleComment(
      this.props.match.params.commentId,
      comment => this.props.initialize(comment)
    );
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Edit Comment</h1>
        <CommentForm
          initialized={this.props.initialized}
          handleSubmit={this.props.handleSubmit(this.onSubmit)}
        />
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.body) {
    errors.body = "Please enter some content";
  }

  return errors;
};

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(commentsActionCreators, dispatch);
};

export default reduxForm({ form: "CommentForm", validate })(
  connect(mapStateToProps, mapDispatchToProps)(NewCommentContainer)
);
