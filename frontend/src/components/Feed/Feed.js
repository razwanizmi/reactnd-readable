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
  selected: PropTypes.string
};

const Feed = ({ categories, selectedCategory }) => {
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
                <select className="sort-select">
                  <option value="none" disabled>
                    Order by
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
            <Categories categories={categories} selected={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
