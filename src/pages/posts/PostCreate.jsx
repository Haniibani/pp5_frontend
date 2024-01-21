import React, { useRef, useState } from "react";

import { useHistory } from "react-router";

import {
  Form,
  Col,
  Row,
  Container,
  Alert,
  Image,
  Button,
} from "react-bootstrap";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload-icon.png";

import { axiosReq } from "../../clients/axios";

import useRedirect from "../../hooks/useRedirect";

import tags from "../../constants/tags";

const PostCreate = () => {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    tags: [],
  });
  const { title, content, image, tags: selectedTags } = postData;
  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) =>
    setPostData((prevState) => ({ ...prevState, [name]: value }));

  const handleTagsChange = ({ target: { options } }) => {
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value));
    setPostData((prevState) => ({ ...prevState, tags: selectedOptions }));
  };

  const handleChangeImage = ({ target: { files } }) => {
    if (files.length) {
      URL.revokeObjectURL(image);
      setPostData((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("tags", selectedTags.join(","));

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const renderAlerts = (field) =>
    errors[field]?.map((message, idx) => (
      <Alert variant="warning" key={idx}>
        {message}
      </Alert>
    ));

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <Form.Group className="text-center">
              <label
                htmlFor="image-upload"
                className={`btn ${
                  image ? "btn-outline-primary" : "btn-primary"
                }`}
              >
                {image ? (
                  <Image src={image} rounded />
                ) : (
                  <Asset src={Upload} message="Upload an image" />
                )}
              </label>
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                hidden
              />
              {renderAlerts("image")}
            </Form.Group>
          </Container>
        </Col>
        <Col md={6}>
          <Container className="text-center">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
              {renderAlerts("title")}
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={content}
                onChange={handleChange}
              />
              {renderAlerts("content")}
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={selectedTags}
                onChange={handleTagsChange}
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button
              variant="outline-primary"
              onClick={() => history.goBack()}
              className="btn-block"
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn-block">
              Create
            </Button>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostCreate;
