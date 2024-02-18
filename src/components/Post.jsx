import React, { useCallback, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import { Card, Media } from "react-bootstrap";

import { useCurrentUser } from "../contexts/CurrentUserContext";

import { axiosRes } from "../clients/axios";

import Avatar from "./Avatar";
import { MoreDropdown } from "./MoreDropdown";
import LikeButton from "./LikeButton";

import styles from "../styles/Post.module.css";
import Error from "../styles/ErrorMessage.module.css";

import Chat from "../icons/Chat";
import Quote from "../icons/Quote";

const Post = ({
  id,
  owner,
  profile_id,
  profile_image,
  comments_count,
  likes_count,
  like_id,
  title,
  content,
  image,
  updated_at,
  postPage,
  setPosts,
  tag,
}) => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const [error, setError] = useState('');
  const isOwner = currentUser?.username === owner;

  const handleEdit = useCallback(
    () => history.push(`/posts/${id}/edit`),
    [history, id]
  );

  const handleDelete = useCallback(async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      setError('An error occurred while trying to delete the post.');
    }
  }, [history, id]);

  return (
    <Card className={styles.Post}>
      {error && <div className={Error.errorMessage}>{error}</div>} {/* Display error message */}
      <Card.Body className={styles.PostBar}>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {isOwner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
        <hr clasName="hr" />
        <Link to={`/posts/${id}`}>
          <div className={styles.ImageWrapper}>
            <Card.Img src={image} alt={title} />
            {tag && <div className={styles.Tag}>{tag}</div>}
          </div>
        </Link>
        <hr clasName="hr" />
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && (
          <Card.Text>
            <span>
              <Quote />
              {content}
            </span>
          </Card.Text>
        )}
        <div className={styles.PostActions}>
          <LikeButton
            postId={id}
            isOwner={isOwner}
            likeId={like_id}
            setPosts={setPosts}
          />
          {likes_count}
          <Link to={`/posts/${id}`}>
            <Chat />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
