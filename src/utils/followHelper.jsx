const followHelper = (profile, clickedProfile, following_id) => {
    if (profile.id === clickedProfile.id) {
      // If this is the profile I clicked on,
      // Update its followers count and set its following id
      return {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      };
    } else if (profile.is_owner) {
      // If this is the profile of the logged-in user,
      // Update its following count
      return { ...profile, following_count: profile.following_count + 1 };
    } else {
      // If this is neither the profile the user clicked on
      // nor the profile the user owns, return it unchanged
      return profile;
    }
  };
  
  export default followHelper;
  