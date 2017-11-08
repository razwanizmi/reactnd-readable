import React from "react";
import PropTypes from "prop-types";

const Votes = ({ voteScore, handleUpVote, handleDownVote }) => {
  return (
    <div>
      <span className="mx-1 pointer text-red" onClick={handleDownVote}>
        ↓
      </span>
      <span className="mx-1" role="img" aria-label="clap">
        👏
      </span>
      <span className="mx-1">{voteScore}</span>
      <span className="mx-1 pointer text-green" onClick={handleUpVote}>
        ↑
      </span>
    </div>
  );
};

Votes.propTypes = {
  voteScore: PropTypes.number.isRequired,
  handleUpVote: PropTypes.func.isRequired,
  handleDownVote: PropTypes.func.isRequired
};

export default Votes;
