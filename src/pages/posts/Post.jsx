import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { Col, Row, Container } from "react-bootstrap";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import fetchMoreData from "../../utils/fetchMoreData";
import isEmpty from "../../utils/isEmpty";

import PostComp from "../../components/Post";
import Comment from "../../components/Comment";
import CommentCreate from "../comments/CommentCreate";
import PopularProfiles from "../../components/PopularProfiles";
import Asset from "../../components/Asset";

import appStyles from "../../styles/App.module.css";
import usePostData from "../../hooks/usePostData";

const Post = () => {
  const currentUser = useCurrentUser();
  const { id, setComments, setPost, comments, post, refetch } = usePostData();

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        {post && <PostComp {...post} setPosts={setPost} postPage />}
        <Container className={appStyles.Content}>
          {currentUser && (
            <CommentCreate
              profile_id={currentUser.profile_id}
              profileImage={currentUser.profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          )}
          {comments.length > 0 && (
            <InfiniteScroll
              dataLength={comments.length}
              next={() => fetchMoreData(comments, setComments)}
              hasMore={!!comments.next}
              loader={<Asset spinner />}
            >
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                  refetch={refetch}
                />
              ))}
            </InfiniteScroll>
          )}
          {isEmpty(comments) && (
            <span>
              {currentUser
                ? "No comments yet, be the first to comment!"
                : "No comments... yet"}
            </span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
};

export default Post;
