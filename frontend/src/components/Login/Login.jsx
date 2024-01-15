import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Login = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="heading">
          <h1>Login</h1>
        </div>
        <div className="form">
          <Form.Group as={Row} className="mb-3" controlId="FormEmpID">
            <Form.Label className="mb-3" row sm={2}>
              Employee ID
            </Form.Label>
            <Col sm={10} lg={12}>
              <Form.Control
                className="mb-4"
                type="text"
                placeholder="Employee ID"
              />
            </Col>

            <Col sm={10} lg={12}>
              <Button type="submit" style={{ width: "100%" }}>
                Login
              </Button>
            </Col>
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default Login;
