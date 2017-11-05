import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../";

const Feed = () => {
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
                  <option value="dateDesc">
                    Date (latest)
                  </option>
                  <option value="dateAsc">
                    Date (oldest)
                  </option>
                  <option value="likesDesc">
                    Likes (highest)
                  </option>
                  <option value="likesAsc">
                    Likes (lowest)
                  </option>
                </select>
              </div>
            </div>

            <hr className="m-0" />
          </div>
          <div className="col-xs-2 text-center cat-list">
            <Link className="btn btn-cat mb-1" to="/react">
              React
            </Link>
            <Link className="btn btn-cat mb-1" to="/redux">
              Redux
            </Link>
            <Link className="btn btn-cat mb-1" to="/udacity">
              Udacity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
