import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NewCommentContainer } from "../../containers";
import { Votes } from "../";
import { formatTimestamp } from "../../helpers/utils";

const Comment = ({
  comment,
  createAndHandleCommentVote,
  deleteAndHandleComment,
  post
}) => {
  const handleUpVote = () => {
    createAndHandleCommentVote(comment.id, "upVote");
  };

  const handleDownVote = () => {
    createAndHandleCommentVote(comment.id, "downVote");
  };

  const handleDelete = () => {
    deleteAndHandleComment(comment.id);
  };

  return (
    <div>
      <div className="row mt-3">
        <div className="col-xs-12">
          <p className="text-1">
            <span className="text-blue">{comment.author}</span>
            {` (at ${formatTimestamp(comment.timestamp)})`}
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-xs-12">
          <div className="pull-left">
            <Votes
              voteScore={comment.voteScore}
              handleUpVote={handleUpVote}
              handleDownVote={handleDownVote}
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
              onClick={handleDelete}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <p className="justify">{comment.body}</p>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  createAndHandleCommentVote: PropTypes.func.isRequired,
  deleteAndHandleComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const Comments = ({
  comments,
  createAndHandleCommentVote,
  deleteAndHandleComment,
  post
}) => {
  const commentsIds = Object.keys(comments).sort(
    (a, b) => comments[b].timestamp - comments[a].timestamp
  );

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-xs-12">
          COMMENTS ({Object.keys(comments).length})
        </div>
      </div>
      <hr className="m-0" />
      <div className="row">
        <div className="col-xs-6">
          {commentsIds.length === 0 && (
            <p className="mt-3">No comments yet</p>
          )}

          {commentsIds.map(commentId => (
            <Comment
              key={commentId}
              comment={comments[commentId]}
              createAndHandleCommentVote={createAndHandleCommentVote}
              deleteAndHandleComment={deleteAndHandleComment}
              post={post}
            />
          ))}
        </div>
        <div className="col-xs-4 col-xs-offset-2 mt-3">
          <NewCommentContainer postId={post.id} />
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.object.isRequired,
  createAndHandleCommentVote: PropTypes.func.isRequired,
  deleteAndHandleComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default Comments;
