import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../clients/axios";

import styles from "../../styles/CommentCreateEditForm.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CommentEdit = (props) => {
  const history = useHistory();
  const { id, content, setShowEditForm } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setShowEditForm(false);
      // location.reload();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
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
  );
};

export default CommentEdit;
