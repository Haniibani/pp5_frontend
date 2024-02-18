import React, { useCallback, useState } from "react";

import Form from "react-bootstrap/Form";

import { axiosRes } from "../../clients/axios";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Error from "../../styles/ErrorMessage.module.css";

const CommentEdit = (props) => {
  const { id, content, setShowEditForm, refetch } = props;

  const [formContent, setFormContent] = useState(content);
  const [error, setError] = useState('');

  const handleChange = useCallback((event) => {
    setFormContent(event.target.value);
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setShowEditForm(false);
      refetch()
    } catch (err) {
      setError('An error occurred while saving the comment.');
    }
  }, [formContent, id, refetch, setShowEditForm]);

  return (
    <>
      {error && <div className={Error.errorMessage}>{error}</div>} {/* Display error message */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="pr-1">
          <Form.Control
            className={styles.Form}
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>
        <div className="text-right">
          <button
            className={styles.Button}
            onClick={() => setShowEditForm(false)}
            type="button"
          >
            cancel
          </button>
          <button
            className={styles.Button}
            disabled={!content.trim()}
            type="submit"
          >
            save
          </button>
        </div>
      </Form>
    </>
  );
};

export default CommentEdit;
