import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Header, Loading } from "../";

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

const Feed = ({ categories, categoryId, posts, setSortBy, sortBy }) => {
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

            <hr className="m-0" />
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
  posts: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};

export default Feed;
