import React, { useCallback, useEffect, useRef, useState } from "react";

import { useHistory, useParams } from "react-router";

import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Image,
} from "react-bootstrap";

import styles from "../../styles/PostEdit.module.css";
import appStyles from "../../styles/App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../clients/axios";

import tags from "../../constants/tags";

const PostEdit = () => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    tag: "",
  });
  const { title, content, image, tag } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, tag, is_owner } = data;

        is_owner
          ? setPostData({ title, content, image, tag })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = useCallback(
    (event) => {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      });
    },
    [postData]
  );

  const handleChangeImage = useCallback(
    (event) => {
      if (event.target.files.length) {
        URL.revokeObjectURL(image);
        setPostData({
          ...postData,
          image: URL.createObjectURL(event.target.files[0]),
        });
      }
    },
    [image, postData]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("tag", tag);

      if (imageInput?.current?.files[0]) {
        formData.append("image", imageInput.current.files[0]);
      }

      try {
        await axiosReq.put(`/posts/${id}/`, formData);
        history.push(`/posts/${id}`);
      } catch (err) {
        // console.log(err);
        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      }
    },
    [content, history, id, tag, title]
  );

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Tag</Form.Label>
        <Form.Control
          as="select"
          name="tag"
          value={tag}
          onChange={handleChange}
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors?.tag?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostEdit;
