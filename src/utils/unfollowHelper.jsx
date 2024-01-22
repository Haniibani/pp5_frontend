const unfollowHelper = (profile, clickedProfile) => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    };
  } else if (profile.is_owner) {
    return { ...profile, following_count: profile.following_count - 1 };
  } else {
    return profile;
  }
};

export default unfollowHelper;
