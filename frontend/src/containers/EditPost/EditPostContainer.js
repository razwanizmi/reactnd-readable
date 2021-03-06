import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import { PostForm } from "../../components";
import * as categoriesActionCreators from "../../redux/modules/categories";
import * as postsActionCreators from "../../redux/modules/posts";

class EditPostContainer extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    fetchAndHandleCategories: PropTypes.func.isRequired,
    fetchAndHandlePost: PropTypes.func.isRequired,
    updateAndHandlePost: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchAndHandleCategories();
    this.props.fetchAndHandlePost(this.props.match.params.postId, post =>
      this.props.initialize(post)
    );
  }

  onSubmit = values => {
    this.props.updateAndHandlePost(values, () => this.props.history.push("/"));
  };

  render() {
    const { categories, handleSubmit, initialized } = this.props;

    return (
      <PostForm
        categories={categories}
        handleSubmit={handleSubmit(this.onSubmit)}
        initialized={initialized}
      />
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter a title";
  }
  if (!values.body) {
    errors.body = "Please enter some content";
  }

  return errors;
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { ...categoriesActionCreators, ...postsActionCreators },
    dispatch
  );
};

export default reduxForm({
  form: "PostForm",
  validate
})(connect(mapStateToProps, mapDispatchToProps)(EditPostContainer));
