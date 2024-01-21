import React, { useState, useEffect, useRef, useCallback } from "react";

import { useHistory, useParams } from "react-router-dom";

import {
  Form,
  Button,
  Image,
  Row,
  Col,
  Container,
  Alert,
} from "react-bootstrap";

import { axiosReq } from "../../clients/axios";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../styles/App.module.css";

const ProfileEdit = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
    facebook_link: "",
    linkedin_link: "",
    twitter_link: "",
  });

  const { name, content, image, facebook_link, linkedin_link, twitter_link } =
    profileData;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const {
            name,
            content,
            image,
            facebook_link,
            linkedin_link,
            twitter_link,
          } = data;
          setProfileData({
            name,
            content,
            image,
            facebook_link,
            linkedin_link,
            twitter_link,
          });
        } catch (err) {
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };
    handleMount();
  }, [currentUser, history, id]);

  const handleChange = useCallback(
    (event) => {
      setProfileData({
        ...profileData,
        [event.target.name]: event.target.value,
      });
    },
    [setProfileData, profileData]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      formData.append("facebook_link", facebook_link);
      formData.append("linkedin_link", linkedin_link);
      formData.append("twitter_link", twitter_link);

      if (imageFile?.current?.files[0]) {
        formData.append("image", imageFile?.current?.files[0]);
      }

      try {
        const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
        setCurrentUser((currentUser) => ({
          ...currentUser,
          profile_image: data.image,
        }));
        history.goBack();
      } catch (err) {
        setErrors(err.response?.data);
      }
    },
    [
      setErrors,
      setCurrentUser,
      content,
      facebook_link,
      history,
      id,
      linkedin_link,
      name,
      twitter_link,
    ]
  );

  // Function to render error messages
  const renderErrorMessages = useCallback(
    (fieldName) => {
      return (
        errors[fieldName] &&
        errors[fieldName].map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))
      );
    },
    [errors]
  );

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
        />
        {renderErrorMessages("content")}
      </Form.Group>

      {/* Social Media Fields */}
      <Form.Group>
        <Form.Label>Facebook Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Facebook link"
          name="facebook_link"
          value={facebook_link}
          onChange={handleChange}
        />
        {renderErrorMessages("facebook_link")}
      </Form.Group>
      <Form.Group>
        <Form.Label>LinkedIn Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter LinkedIn link"
          name="linkedin_link"
          value={linkedin_link}
          onChange={handleChange}
        />
        {renderErrorMessages("linkedin_link")}
      </Form.Group>
      <Form.Group>
        <Form.Label>Twitter Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Twitter link"
          name="twitter_link"
          value={twitter_link}
          onChange={handleChange}
        />
        {renderErrorMessages("twitter_link")}
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEdit;
