import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Header, Loading, Posts } from "../";
import { formatTimestamp } from "../../helpers/utils";

const Categories = ({ categories, selected }) => {
  const categoryIds = Object.keys(categories);

  if (categoryIds.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        className={`btn btn-cat mb-1 ${selected === "all" && "active"}`}
        to="/"
      >
        All
      </Link>
      {categoryIds.map(categoryId => (
        <Link
          key={categoryId}
          className={`btn btn-cat mb-1 ${selected === categoryId && "active"}`}
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

const PostsList = ({ feed, posts }) => {
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

        const handleDownVote = () => {
          console.log(`Down voted post ${postId}!`);
        };

        const handleUpVote = () => {
          console.log(`Up voted post ${postId}!`);
        };

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
                <span
                  className="mx-1 pointer text-red"
                  onClick={handleDownVote}
                >
                  ↓
                </span>
                <span className="mx-1" role="img" aria-label="cat">
                  😺
                </span>
                <span className="mx-1">{post.voteScore}</span>
                <span
                  className="mx-1 pointer text-green"
                  onClick={handleUpVote}
                >
                  ↑
                </span>
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
  posts: PropTypes.object.isRequired
};

const Feed = ({ categories, categoryId, feed, posts, setSortBy, sortBy }) => {
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
            <PostsList feed={feed} posts={posts} />
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
  posts: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};

export default Feed;
