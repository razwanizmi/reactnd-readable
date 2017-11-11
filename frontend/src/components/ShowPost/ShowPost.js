import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Header, Votes } from "../";

const ShowPost = ({
  createAndHandlePostVote,
  deleteAndHandlePost,
  history,
  post
}) => {
  const handleUpVote = () => {
    createAndHandlePostVote(post.id, "upVote");
  };

  const handleDownVote = () => {
    createAndHandlePostVote(post.id, "downVote");
  };

  if (Object.keys(post).length === 0) {
    return null;
  }

  return (
    <div>
      <Header title={post.title} text={`By: ${post.author}`} color="#fcf8e3" />
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="pull-left">
              <Link
                className="btn btn-tiny btn-gray text-0-75"
                to={`/${post.category}/${post.id}/edit`}
              >
                Edit
              </Link>
              <span
                className="btn btn-tiny btn-red text-0-75 ml-1"
                onClick={() =>
                  deleteAndHandlePost(post.id, () => history.push("/"))}
              >
                Delete
              </span>
            </div>
            <div className="pull-right">
              <Votes
                voteScore={post.voteScore}
                handleUpVote={handleUpVote}
                handleDownVote={handleDownVote}
              />
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-xs-12 mt-4">
            <p className="justify">{post.body}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-xs-6 col-xs-offset-6">
            COMMENTS
            <hr className="m-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

ShowPost.propTypes = {
  createAndHandlePostVote: PropTypes.func.isRequired,
  deleteAndHandlePost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default ShowPost;
