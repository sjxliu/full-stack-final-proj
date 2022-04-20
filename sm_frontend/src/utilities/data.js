export const userQuery = (userId) => {
  const query = `*[_type = "user" && _id =='${userId}' ]`;

  return query
};

// Logic: try to get doc of type = to user and _id = to user id
