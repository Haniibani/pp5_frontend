import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Row, Container } from "react-bootstrap";
import PopularProfiles from "../../components/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../clients/axios";
import ProfileInformation from "../../components/ProfileInformation";
import ProfilePosts from "../../components/ProfilePosts";
import Asset from "../../components/Asset";
import appStyles from "../../styles/App.module.css";

const Profile = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const isOwner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, postsResponse] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
        ]);
        setProfileData((prev) => ({
          ...prev,
          pageProfile: { results: [profileResponse.data] },
        }));
        setProfilePosts(postsResponse.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded && (
            <ProfileInformation
              profile={profile}
              isOwner={isOwner}
              handleFollow={handleFollow}
              handleUnfollow={handleUnfollow}
              currentUser={currentUser}
            />
          )}
        </Container>
        {hasLoaded && (
          <ProfilePosts
            profilePosts={profilePosts}
            setProfilePosts={setProfilePosts}
          />
        )}
        {!hasLoaded && <Asset spinner />}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default Profile;
