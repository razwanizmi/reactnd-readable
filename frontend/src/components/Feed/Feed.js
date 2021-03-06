import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Header, Loading, Votes } from "../";
import { formatTimestamp } from "../../helpers/utils";

const Categories = ({ categories, selected }) => {
  const categoryIds = Object.keys(categories);

  if (categoryIds.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        className={`btn btn-cat btn-green mb-1 ${selected === "all" &&
          "active"}`}
        to="/"
      >
        All
      </Link>
      {categoryIds.map(categoryId => (
        <Link
          key={categoryId}
          className={`btn btn-cat btn-green mb-1 ${selected === categoryId &&
            "active"}`}
          to={`/${categoryId}`}
        >
          {categories[categoryId]}
        </Link>
      ))}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired
};

const PostsList = ({
  feed,
  createAndHandlePostVote,
  history,
  deleteAndHandlePost,
  posts
}) => {
  if (feed.length === 0) {
    return (
      <div className="row">
        <div className="col-xs-12">
          <hr className="m-0" />
          <p className="mt-4">No posts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {feed.map(postId => {
        const post = posts[postId];

        const handleUpVote = () => {
          createAndHandlePostVote(postId, "upVote");
        };

        const handleDownVote = () => {
          createAndHandlePostVote(postId, "downVote");
        };

        const handleDelete = postId =>
          deleteAndHandlePost(postId, () => history.push("/"));

        return (
          <div key={postId}>
            <div className="row">
              <div className="col-xs-12">
                <hr className="m-0" />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <h3>
                  <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                </h3>
              </div>
              <div className="col-xs-2 mt-4">
                <Votes
                  voteScore={post.voteScore}
                  handleUpVote={handleUpVote}
                  handleDownVote={handleDownVote}
                />
              </div>
              <div className="col-xs-2 mt-4 text-right">
                <p>{formatTimestamp(post.timestamp)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p className="text-1">
                  By <span className="text-blue">{post.author}</span>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <p className="text-1">
                  🗣
                  <span className="mx-1">{post.commentCount}</span>
                </p>
              </div>
              <div className="col-xs-6 text-right">
                <Link
                  className="btn btn-tiny btn-gray text-0-75"
                  to={`${post.category}/${post.id}/edit`}
                >
                  Edit
                </Link>
                <span
                  className="btn btn-tiny btn-red text-0-75 ml-1"
                  onClick={() => handleDelete(postId)}
                >
                  Delete
                </span>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-xs-12">
                <p className="justify">{post.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

PostsList.propTypes = {
  feed: PropTypes.array.isRequired,
  createAndHandlePostVote: PropTypes.func.isRequired,
  deleteAndHandlePost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const Feed = ({
  categories,
  categoryId,
  feed,
  createAndHandlePostVote,
  deleteAndHandlePost,
  history,
  posts,
  setSortBy,
  sortBy
}) => {
  return (
    <div>
      <Header
        title="Welcome to Readable"
        text="Where words sing, and sentences dance 🕺💃"
      />
      <div className="container">
        <div className="row">
          <div className="col-xs-10">
            <div className="row">
              <div className="col-xs-10">
                <h4>Feed</h4>
              </div>
              <div className="col-xs-2 text-right mt-1">
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="none" disabled>
                    Sort by
                  </option>
                  <option value="dateDesc">Date (latest)</option>
                  <option value="dateAsc">Date (oldest)</option>
                  <option value="likesDesc">Likes (highest)</option>
                  <option value="likesAsc">Likes (lowest)</option>
                </select>
              </div>
            </div>
            <PostsList
              feed={feed}
              createAndHandlePostVote={createAndHandlePostVote}
              history={history}
              deleteAndHandlePost={deleteAndHandlePost}
              posts={posts}
            />
          </div>
          <div className="col-xs-2 text-center cat-list">
            <Categories categories={categories} selected={categoryId} />
          </div>
        </div>
      </div>
    </div>
  );
};

Feed.propTypes = {
  categories: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  feed: PropTypes.array.isRequired,
  createAndHandlePostVote: PropTypes.func.isRequired,
  deleteAndHandlePost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};

export default Feed;
