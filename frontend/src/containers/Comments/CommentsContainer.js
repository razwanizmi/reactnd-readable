import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Comments } from "../../components";
import * as commentsActionCreators from "../../redux/modules/comments";

class CommentsContainer extends Component {
  static propTypes = {
    comments: PropTypes.object.isRequired,
    createAndHandleCommentVote: PropTypes.func.isRequired,
    fetchAndHandleComments: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchAndHandleComments(this.props.post.id);
  }

  render() {
    const {
      comments,
      createAndHandleCommentVote,
      deleteAndHandleComment,
      post
    } = this.props;

    return (
      <Comments
        comments={comments}
        createAndHandleCommentVote={createAndHandleCommentVote}
        deleteAndHandleComment={deleteAndHandleComment}
        post={post}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: Object.keys(state.comments).reduce((accumulator, commentId) => {
      if (state.comments[commentId].parentId === ownProps.post.id) {
        accumulator[commentId] = state.comments[commentId];
      }
      return accumulator;
    }, {})
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(commentsActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
