import React, { useCallback, useState } from "react";

import { Link } from "react-router-dom";

import { Form, InputGroup } from "react-bootstrap";

import Avatar from "../../components/Avatar";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Error from "../../styles/ErrorMessage.module.css";

import { axiosRes } from "../../clients/axios";

const CommentCreate = ({
  post,
  setPost,
  setComments,
  profileImage,
  profile_id,
}) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState('');

  const handleChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  const handleSubmit =useCallback(async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", { content, post });
      setComments((prevComments) => {
        return prevComments ? [data, ...prevComments] : [data];
      });
      setPost((prevPost) => {
        return prevPost
          ? {
            ...prevPost,
            comments_count: (prevPost.comments_count ?? 0) + 1,
          }
          : [];
      });
      setContent("");
    } catch (err) {
      setError('An error occurred while submitting your comment.');
    }
  }, [content, post, setComments, setPost]);

  return (
    <>
      {error && <div className={Error.errorMessage}>{error}</div>} {/* Display error message */}
      <Form className="mt-2" onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profileImage} />
            </Link>
            <Form.Control
              className={styles.Form}
              placeholder="my comment..."
              as="textarea"
              value={content}
              onChange={handleChange}
              rows={2}
            />
          </InputGroup>
        </Form.Group>
        <button
          className={`${styles.Button} btn d-block ml-auto`}
          disabled={!content.trim()}
          type="submit"
        >
          post
        </button>
      </Form>
    </>
  );
};

export default CommentCreate;
