import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Votes } from "../";
import { formatTimestamp } from "../../helpers/utils";

const Comment = ({ comment, post }) => {
  return (
    <div>
      <div className="row mt-1">
        <div className="col-xs-12">
          <p className="text-1">
            <span className="text-blue">{comment.author}</span>
            {` (at ${formatTimestamp(comment.timestamp)})`}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <p className="justify">{comment.body}</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-xs-12">
          <div className="pull-left">
            <Votes
              voteScore={comment.voteScore}
            />
          </div>
          <div className="pull-right">
            <Link
              className="btn btn-tiny btn-gray text-0-75"
              to={`/${post.category}/${post.id}/comments/${comment.id}/edit`}
            >
              Edit
            </Link>
            <span
              className="btn btn-tiny btn-red text-0-75 ml-1"
              onClick={() => {}}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

const Comments = ({ comments, post }) => {
  const commentsIds = Object.keys(comments).sort(
    (a, b) => comments[b].timestamp - comments[a].timestamp
  );

  return (
    <div className="row mt-4">
      <div className="col-xs-8 col-xs-offset-4">
        <div className="row">
          <div className="col-xs-12">
            <div className="pull-left">
              COMMENTS ({Object.keys(comments).length})
            </div>
            <div className="pull-right">
              <Link
                className="btn btn-tiny btn-green text-0-75 mb-1"
                to={`/${post.category}/${post.id}/comments/new`}
              >
                Add a Comment
              </Link>
            </div>
          </div>
        </div>
        <hr className="m-0" />
        {commentsIds.map(commentId => (
          <Comment key={commentId} comment={comments[commentId]} post={post} />
        ))}
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default Comments;
