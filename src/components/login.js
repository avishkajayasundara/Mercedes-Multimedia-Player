import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./login.css";

//REDUX
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import PropTypes from "prop-types";

function Login(props) {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //Destructure props
  const {
    UI: { loading },
  } = props;

  //Update state with errors
  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors);
  }, [props.UI.errors]);

  //Method to handle form submission
  const handleLogin = (event) => {
    event.preventDefault();
    const data = { accessCode: password };
    props.loginUser(data, props.history);
  };

  return (
    <div
      className="flex flex-1 flex-col background"
      style={{ minHeight: "100vH" }}
    >
      <Container>
        <h1 className="title">MERCEDES</h1>
        <Form onSubmit={handleLogin}>
          <Card>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="label"> Access Code </Form.Label>
              <Form.Control
                type="password"
                className={errors.error ? "form is-invalid" : "form"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="error-text" hidden={!errors.error}>
                {errors.error}
              </p>
              <Button
                variant="secondary"
                size="lg"
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form.Group>
          </Card>
        </Form>
      </Container>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
