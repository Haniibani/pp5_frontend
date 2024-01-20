import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../clients/axios";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import followHelper from "../utils/followHelper";
import unfollowHelper from "../utils/unfollowHelper";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      updateProfileDataWithFollow(clickedProfile, data.id);
    } catch (err) {
      // Handle error
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      updateProfileDataWithUnfollow(clickedProfile);
    } catch (err) {
      // Handle error
    }
  };

  const updateProfileDataWithFollow = (clickedProfile, following_id) => {
    setProfileData((prevState) => ({
      ...prevState,
      pageProfile: {
        results: prevState.pageProfile.results.map((profile) =>
          followHelper(profile, clickedProfile, following_id)
        ),
      },
      popularProfiles: {
        ...prevState.popularProfiles,
        results: prevState.popularProfiles.results.map((profile) =>
          followHelper(profile, clickedProfile, following_id)
        ),
      },
    }));
  };

  const updateProfileDataWithUnfollow = (clickedProfile) => {
    setProfileData((prevState) => ({
      ...prevState,
      pageProfile: {
        results: prevState.pageProfile.results.map((profile) =>
          unfollowHelper(profile, clickedProfile)
        ),
      },
      popularProfiles: {
        ...prevState.popularProfiles,
        results: prevState.popularProfiles.results.map((profile) =>
          unfollowHelper(profile, clickedProfile)
        ),
      },
    }));
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        // Handle error
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
