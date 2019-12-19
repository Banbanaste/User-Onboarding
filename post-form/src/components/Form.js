import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container, Row, Col, Button, Badge } from "reactstrap";

const FormComponent = props => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log("status has changed", props.status);
    props.status && setUser(user => [...user, props.status]);
  }, [props.status]);

  return (
    <Container>
      <Row>
        <Col style={{ backgroundColor: "lightgray", padding: "30px" }}>
          <Form>
            <Row>
              <label>
                Name: <br />
                <Field
                  type="text"
                  name="name"
                  placeholder={
                    props.touched.name && props.errors.name && props.errors.name
                  }
                />
              </label>
            </Row>
            <Row>
              <label>
                Email:
                <br />
                <Field
                  type="email"
                  name="email"
                  placeholder={
                    props.touched.email &&
                    props.errors.email &&
                    props.errors.email
                  }
                />
              </label>
            </Row>
            <Row>
              <label>
                Password:
                <br />
                <Field
                  type="text"
                  name="password"
                  placeholder={
                    props.touched.password &&
                    props.errors.password &&
                    props.errors.password
                  }
                />
              </label>
            </Row>
            <Row>
              <label>
                Terms of Service:
                <Field
                  type="checkbox"
                  name="tos"
                  checked={props.values.tos}
                  style={{ margin: "0 0 0 10px" }}
                />
                {props.touched.tos && props.errors.tos && (
                  <p>{props.errors.tos}</p>
                )}
              </label>
            </Row>
            <Row>
              <Button color="primary" size="sm" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
        <Col xs="6" sm="4">
          {user.map(info => {
            return (
              <ul
                key={info.id}
                style={{
                  listStyle: "none",
                  padding: "30px",
                  backgroundColor: "slategrey"
                }}
              >
                <li>
                  <Badge color="dark">name:</Badge>
                  <br />
                  {info.name}
                </li>
                <li>
                  <Badge color="dark">email:</Badge> <br /> {info.email}
                </li>
                <li>
                  <Badge color="dark">password:</Badge> <br /> {info.password}
                </li>
              </ul>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

const FormikFormWrapper = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      tos: props.tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Is Required"),
    email: Yup.string().required("Is Required"),
    password: Yup.string().required("Is Required"),
    tos: Yup.boolean().oneOf([true], "Must Accept Terms of Service")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(FormComponent);

export default FormikFormWrapper;
