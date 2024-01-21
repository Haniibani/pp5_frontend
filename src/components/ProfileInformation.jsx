import React from "react";

import { Col, Row, Image, Button } from "react-bootstrap";

import { ProfileEditDropdown } from "./MoreDropdown";
import SocialMediaLinks from "./SocialMediaLinks";

import styles from "../styles/ProfilePage.module.css";
import btnStyles from "../styles/Button.module.css";

const ProfileInformation = ({
  profile,
  isOwner,
  handleFollow,
  handleUnfollow,
  currentUser,
}) => {
  const renderFollowButton = () =>
    profile?.following_id ? (
      <Button
        className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
        onClick={() => handleUnfollow(profile)}
      >
        unfollow
      </Button>
    ) : (
      <Button
        className={`${btnStyles.Button} ${btnStyles.Black}`}
        onClick={() => handleFollow(profile)}
      >
        follow
      </Button>
    );

  return (
    <>
      <ProfileEditDropdown id={profile?.id} />
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
          <SocialMediaLinks profile={profile} />
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser && !isOwner && renderFollowButton()}
        </Col>
        {profile?.content && (
          <Col lg={12} className="p-3 text-left">
            {profile.content}
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProfileInformation;
