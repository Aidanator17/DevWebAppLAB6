const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getUserByGithubIdOrCreate = (profile) => {
  let user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithGithubId(profile['id'],profile['displayName'],'Github');
  user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByTwitchIdOrCreate = (profile) => {
  let user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithGithubId(profile['id'],profile['display_name'],'Twitch');
  user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByImgurIdOrCreate = (profile) => {
  let user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithGithubId(profile['id'],profile['url'],'Imgur');
  user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByRedditIdOrCreate = (profile) => {
  let user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithGithubId(profile['id'],profile['name'],'Reddit');
  user = userModel.GITfindById(profile['id']);
  if (user) {
    return user;
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGithubIdOrCreate,
  getUserByTwitchIdOrCreate,
  getUserByImgurIdOrCreate,
  getUserByRedditIdOrCreate
};
