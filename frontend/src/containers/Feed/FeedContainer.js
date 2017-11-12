import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Feed } from "../../components";
import * as categoriesActionCreators from "../../redux/modules/categories";
import * as postsActionCreators from "../../redux/modules/posts";
import * as sortByActionCreators from "../../redux/modules/sortBy";
import { generateFeed } from "../../helpers/utils";

class FeedContainer extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    deleteAndHandlePost: PropTypes.func.isRequired,
    fetchAndHandleCategories: PropTypes.func.isRequired,
    fetchAndHandlePosts: PropTypes.func.isRequired,
    createAndHandlePostVote: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    setSortBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.fetchAndHandleCategories();
    this.props.fetchAndHandlePosts();
  }

  render() {
    const {
      categories,
      createAndHandlePostVote,
      deleteAndHandlePost,
      history,
      posts,
      setSortBy,
      sortBy
    } = this.props;

    const categoryId = this.props.match.params.categoryId || "all";
    const feed = generateFeed(posts, categoryId, sortBy);

    return (
      <Feed
        categories={categories}
        feed={feed}
        createAndHandlePostVote={createAndHandlePostVote}
        deleteAndHandlePost={deleteAndHandlePost}
        posts={posts}
        categoryId={categoryId}
        history={history}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts,
    sortBy: state.sortBy
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...categoriesActionCreators,
      ...postsActionCreators,
      ...sortByActionCreators
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
