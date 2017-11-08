export const formatCategories = categories => {
  return categories.reduce((accumulator, category) => {
    accumulator[category.path] =
      category.name[0].toUpperCase() + category.name.slice(1);
    return accumulator;
  }, {});
};

export const formatArrayToObject = array => {
  return array.reduce((accumulator, instance) => {
    accumulator[instance.id] = instance;
    return accumulator;
  }, {});
};

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const filterPosts = (posts, filter) => {
  if (filter === "all") {
    return posts;
  }

  return Object.keys(posts).reduce((accumulator, postId) => {
    if (posts[postId].category === filter) {
      accumulator[postId] = posts[postId];
    }
    return accumulator;
  }, {});
};

const sortPostsIds = (posts, sort) => {
  switch (sort) {
    case "dateAsc":
      return Object.keys(posts).sort(
        (a, b) => posts[a].timestamp - posts[b].timestamp
      );
    case "likesDesc":
      return Object.keys(posts).sort(
        (a, b) => posts[b].voteScore - posts[a].voteScore
      );
    case "likesAsc":
      return Object.keys(posts).sort(
        (a, b) => posts[a].voteScore - posts[b].voteScore
      );
    default:
      return Object.keys(posts).sort(
        (a, b) => posts[b].timestamp - posts[a].timestamp
      );
  }
};

export const generateFeed = (posts, filter, sort) => {
  return sortPostsIds(filterPosts(posts, filter), sort);
};
