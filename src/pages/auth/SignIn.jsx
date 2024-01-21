import React, { useState } from "react";

import axios from "axios";

import {
  Form,
  Alert,
  Button,
  Col,
  Row,
  Image,
  Container,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

import useRedirect from "../../hooks/useRedirect";

import setTokenTimestamp from "../../utils/setTokenTimestamp"

import Technology from '../../assets/Technology.png';
import Travel from '../../assets/Travel.png';
import Art from '../../assets/Art.png';
import History from '../../assets/History.png';

const SignIn = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Container className="p-4">
            <h1 className="text-center">Sign In</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="visually-hidden">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password">
                <Form.Label className="visually-hidden">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.password?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Button
                type="submit"
                variant="success"
                className="btn btn-block"
                style={{ cursor: "pointer" }}
              >
                Sign In
              </Button>
              {errors?.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>

          <Container className="text-center mt-3">
            <span>
              Don't have an account?{' '}
              <Link to="/signup" className="text-decoration-none" style={{ fontWeight: 'bold', color: '#28a745' }}>
                Sign up now!
              </Link>{' '}
            </span>
          </Container>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs={6} md={3} className="p-2">
          <Image src={Technology} fluid />
        </Col>
        <Col xs={6} md={3} className="p-2">
          <Image src={Travel} fluid />
        </Col>
        <Col xs={6} md={3} className="p-2">
          <Image src={Art} fluid />
        </Col>
        <Col xs={6} md={3} className="p-2">
          <Image src={History} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
