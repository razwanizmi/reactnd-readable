import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Feed, NotFound } from "../../components";
import * as categoriesActionCreators from "../../redux/modules/categories";
import * as sortByActionCreators from "../../redux/modules/sortBy";

class FeedContainer extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    getAndHandleCategories: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    setSortBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.getAndHandleCategories();
  }

  render() {
    const categoryId = this.props.match.params.categoryId || "all";

    if (categoryId !== "all" && !this.props.categories[categoryId]) {
      return <NotFound />;
    }

    return (
      <Feed
        categories={this.props.categories}
        posts={this.props.posts}
        categoryId={categoryId}
        setSortBy={this.props.setSortBy}
        sortBy={this.props.sortBy}
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
    { ...categoriesActionCreators, ...sortByActionCreators },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
