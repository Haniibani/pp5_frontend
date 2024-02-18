import React, { useState } from "react";
import Media from "react-bootstrap/Media";

import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import { MoreDropdown } from "./MoreDropdown";

import CommentEdit from "../pages/comments/CommentEdit";

import styles from "../styles/Comment.module.css";
import Error from "../styles/ErrorMessage.module.css";

import { useCurrentUser } from "../contexts/CurrentUserContext";

import { axiosRes } from "../clients/axios";


const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setComments,
    refetch
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const [error, setError] = useState('');
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      const response = await axiosRes.delete(`/comments/${id}/`);
      if (response.status === 204) { // Assuming 204 No Content on successful deletion
        refetch()
      } else {
        setError('Failed to delete the comment.');
      }
    } catch (err) {
      setError('An error occurred while trying to delete the comment.');
    console.error(err);
    }
  };

  return (
    <>
    {error && <div className={Error.errorMessage}>{error}</div>}
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEdit
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
              refetch={refetch}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;