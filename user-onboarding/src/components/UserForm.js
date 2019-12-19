import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import '../App.css';

const UserForm = ({ values, errors, touched, status }) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status updated", status);
    status && setUsers(animals => [...animals, status]);
  }, [status]);
  return (
    <div >
      <Form className="form-container">

        <label htmlFor="name">
          Name
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>

        <label htmlFor="email">
          Email
          <Field
            id="email"
            type="text"
            name="email"
            placeholder="Email"
          />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>

        <label htmlFor="password">
          Password
          <Field
            id="empasswordail"
            type="text"
            name="password"
            placeholder="Password"
          />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>

        <label>
          Accept Terms of Service
          <Field
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>
      {users.map(user => {
        return (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      terms: props.terms || false,

    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),    
  }),


  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;
