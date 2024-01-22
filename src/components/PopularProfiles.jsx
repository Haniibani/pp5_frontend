import React from "react";

import Container from "react-bootstrap/Container";

import { useProfileData } from "../contexts/ProfileDataContext";

import appStyles from "../styles/App.module.css";

import Profile from "./Profile";
import Asset from "./Asset";

import isEmpty from "../utils/isEmpty";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();


  if (isEmpty(popularProfiles)) return <Asset spinner />;

  return (
    <Container
      className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"
        }`}
    >
      <p class="h4">Popular profiles</p>
      {mobile ? (
        <div className="d-flex justify-content-around">
          {popularProfiles.results.slice(0, 4).map((profile) => (
            <Profile key={profile.id} profile={profile} mobile />
          ))}
        </div>
      ) : (
        popularProfiles.results.map((profile) => (
          <Profile key={profile.id} profile={profile} />
        ))
      )}
    </Container>
  );
};

export default PopularProfiles;
