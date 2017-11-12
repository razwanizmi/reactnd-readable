import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ShowPost } from "../../components";
import * as postsActionCreators from "../../redux/modules/posts";

class ShowPostContainer extends Component {
  static propTypes = {
    createAndHandlePostVote: PropTypes.func.isRequired,
    deleteAndHandlePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchAndHandlePost(this.props.match.params.postId);
  }

  render() {
    const {
      createAndHandlePostVote,
      deleteAndHandlePost,
      history,
      post
    } = this.props;

    return (
      <ShowPost
        createAndHandlePostVote={createAndHandlePostVote}
        deleteAndHandlePost={deleteAndHandlePost}
        post={post}
        history={history}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts[ownProps.match.params.postId] || {}
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(postsActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPostContainer);
