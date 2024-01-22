import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import Post from "../components/Post";
import Asset from "../components/Asset";

import fetchMoreData from "../utils/fetchMoreData";

import NoResults from "../assets/NotFound.png";

const ProfilePosts = ({ profilePosts, setProfilePosts }) => (
  <>
    <p className="h2 text-center p-4">Posts</p>
    {profilePosts.results.length ? (
      <InfiniteScroll
        dataLength={profilePosts.results.length}
        next={() => fetchMoreData(profilePosts, setProfilePosts)}
        hasMore={!!profilePosts.next}
        loader={<Asset spinner />}
      >
        {profilePosts.results.map((post) => (
          <Post key={post.id} {...post} setPosts={setProfilePosts} />
        ))}
      </InfiniteScroll>
    ) : (
      <Asset
        src={NoResults}
        message={`No results found, user hasn't posted yet.`}
      />
    )}
  </>
);

export default ProfilePosts;
