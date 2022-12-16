import React, { useState } from "react";
import Button from "../UI/button";

const SignupForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");

  const usernameInputChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  };

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const passwordInputChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    props.signupHandler(e, {
      enteredUsername,
      enteredEmail,
      enteredPassword,
    });

    // setEnteredEmail("");
    // setEnteredUsername("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>User name</label>
        <input
          type="text"
          onChange={usernameInputChangeHandler}
          value={enteredUsername}
        />
        <label>email</label>
        <input type="text" onChange={emailInputChangeHandler} />

        <label>password</label>
        <input type="text" onChange={passwordInputChangeHandler} />
      </div>
      <Button type="submit">Sign up</Button>
    </form>
  );
};
export default SignupForm;
