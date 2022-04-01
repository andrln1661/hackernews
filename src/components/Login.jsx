import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate("/");
    },
  });
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
      name: formState.name,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate("/");
    },
  });

  return (
    <div className="login background-gray">
      <h4>{formState.login ? "Login" : "Sign Up"}</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={formState.email}
          onChange={(event) => {
            event.preventDefault();
            setFormState((prevState) => ({
              ...prevState,
              email: event.target.value,
            }));
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(event) => {
            event.preventDefault();
            setFormState((prevState) => ({
              ...prevState,
              password: event.target.value,
            }));
          }}
        />
        <div className="button-block">
          <button onClick={formState.login ? login : signup}>
            {formState.login ? "login" : "sign up"}
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setFormState({
                ...formState,
                login: !formState.login,
              });
            }}
          >
            {formState.login
              ? "need to create an account?"
              : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
