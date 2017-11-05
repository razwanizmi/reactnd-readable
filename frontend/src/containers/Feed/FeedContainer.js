import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Feed } from "../../components";
import * as categoriesActionCreators from "../../redux/modules/categories";

class FeedContainer extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    sortBy: PropTypes.string.isRequired,
    getAndHandleCategories: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getAndHandleCategories();
  }

  render() {
    const selectedCategory = this.props.match.params.categoryId || "all";

    return (
      <Feed
        categories={this.props.categories}
        posts={this.props.posts}
        sortBy={this.props.posts}
        selectedCategory={selectedCategory}
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
  return bindActionCreators(categoriesActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
