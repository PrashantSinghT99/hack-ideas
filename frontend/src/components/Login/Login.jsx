import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { loginApi } from "../../helper/apis";
import { ChatContextState } from "../../context/Context";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { setToken } = ChatContextState();
  const [empId, SetEmpId] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(empId);
    if (!empId) return;

    const data = await loginApi(empId);
    setToken(data.data.token);
    // console.log(data);
    navigate("/ideas");
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="heading">
          <h1>Login</h1>
        </div>
        <div className="form">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="FormEmpID">
              <Form.Label className="mb-3" sm={2}>
                Enter emp ID
              </Form.Label>
              <Col sm={10} lg={12}>
                <Form.Control
                  required
                  className="mb-4"
                  type="number"
                  placeholder="Employee ID"
                  value={empId}
                  onChange={(e) => SetEmpId(e.target.value)}
                />
              </Col>

              <Col sm={10} lg={12}>
                <Button type="submit" style={{ width: "100%" }}>
                  Login
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
