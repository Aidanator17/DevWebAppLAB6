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
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],profile['json']['avatar_url'],'Github');
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByTwitchIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['display_name'],'Twitch');
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByImgurIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['url'],'Imgur');
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByRedditIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['name'],'Reddit');
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserBySpotifyIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],'Spotify');
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByGoogleIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],'Google');
  user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }
}

const getUserByFacebookIdOrCreate = (profile) => {
  let user = userModel.OUTSIDEfindById(profile['id']);
  if (user) {
    return user;
  }

  let createdUser = userModel.createUserWithOutsideId(profile['id'],profile['displayName'],'Facebook');
  user = userModel.OUTSIDEfindById(profile['id']);
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
  getUserByRedditIdOrCreate,
  getUserBySpotifyIdOrCreate,
  getUserByGoogleIdOrCreate,
  getUserByFacebookIdOrCreate
};
