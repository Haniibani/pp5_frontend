import React, { useRef, useState } from "react";

import { useHistory } from "react-router";

import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
  Image,
  Asset,
  Upload,
} from "react-bootstrap";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload-icon.png";

import { axiosReq } from "../../clients/axios";

import useRedirect from "../../hooks/useRedirect";

const PostCreate = () => {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

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

      <Button
        variant="outline-primary"
        className="btn btn-block"
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button variant="primary" type="submit" className="btn btn-block">
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={7} lg={8}>
          <Container className="d-flex flex-column justify-content-center">
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      htmlFor="image-upload"
                      className="btn btn-outline-primary"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  htmlFor="image-upload"
                  className="d-flex justify-content-center"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

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
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default PostCreate;
