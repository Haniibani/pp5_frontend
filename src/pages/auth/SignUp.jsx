import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

import axios from "axios";

import useRedirect from "../../hooks/useRedirect";

import Cooking from '../../assets/Cooking.png';
import Fashion from '../../assets/Fashion.png';
import Movies from '../../assets/Movies.png';
import Photography from '../../assets/Photography.png';

const SignUp = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Container className="p-4">
            <h1 className="text-center">Sign Up</h1>
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
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password1">
                <Form.Label className="visually-hidden">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password2">
                <Form.Label className="visually-hidden">
                  Confirm password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors?.password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Button type="submit" variant="success" className="w-100">
                Sign Up
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
              Already have an account?{' '}
              <Link to="/signin" className="text-decoration-none" style={{ fontWeight: 'bold', color: '#28a745' }}>
                Sign in
              </Link>
            </span>
          </Container>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
      <Col xs={6} md={3} className="p-2">
        <Image src={Cooking} fluid />
      </Col>
      <Col xs={6} md={3} className="p-2">
        <Image src={Fashion} fluid />
      </Col>
      <Col xs={6} md={3} className="p-2">
        <Image src={Movies} fluid />
      </Col>
      <Col xs={6} md={3} className="p-2">
        <Image src={Photography} fluid />
      </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
