import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Feed } from "../../components";

class FeedContainer extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    sortBy: PropTypes.string.isRequired
  };

  render() {
    return (
      <Feed
        categories={this.props.categories}
        posts={this.props.posts}
        sortBy={this.props.posts}
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

export default connect(mapStateToProps)(FeedContainer);
