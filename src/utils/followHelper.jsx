const followHelper = (profile, clickedProfile, following_id) => {
    if (profile.id === clickedProfile.id) {
      return {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      };
    } else if (profile.is_owner) {
      return { ...profile, following_count: profile.following_count + 1 };
    } else {
      return profile;
    }
  };
  
  export default followHelper;
  