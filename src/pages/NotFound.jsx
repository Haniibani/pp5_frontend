import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/Button.module.css'
import notFoundImage from '../assets/404.png'; // Update this path to your image's location

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <img src={notFoundImage} alt="Page Not Found" style={{ maxWidth: '100%', height: 'auto' }} />
          <h1 className="display-3 mt-3">Oops!</h1>
          <p className="lead">We can't seem to find the page you're looking for.</p>
          <Link to="/">
            <Button className={styles.Button}>Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
