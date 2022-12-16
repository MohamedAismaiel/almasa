import React, { useState } from "react";
import Button from "../UI/button";

const LoginForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const passwordInputChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => props.loginHandler(e, { enteredEmail, enteredPassword })}
    >
      <div>
        <label>email</label>
        <input type="text" onChange={emailInputChangeHandler} />

        <label>password</label>
        <input type="text" onChange={passwordInputChangeHandler} />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};
export default LoginForm;
