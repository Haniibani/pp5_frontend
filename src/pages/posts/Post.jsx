import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import InfiniteScroll from "react-infinite-scroll-component";

import { Col, Row, Container } from "react-bootstrap";

import { axiosReq } from "../../clients/axios";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import fetchMoreData from "../../utils/fetchMoreData";
import isEmpty from "../../utils/isEmpty";

import PostComp from "../../components/Post";
import Comment from "../../components/Comment";
import CommentCreate from "../comments/CommentCreate";
import PopularProfiles from "../../components/PopularProfiles";
import Asset from "../../components/Asset";

import appStyles from "../../styles/App.module.css";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: post }, { data: commentsData }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost(post);
        setComments(commentsData.results);
      } catch (err) {
        // Handle error
      }
    };

    fetchData();
  }, [id]);

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
