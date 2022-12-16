import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { LoginContext } from "../components/context/loginContext";
import SignupForm from "../components/signupForm/signupForm";

function Signup(props) {
  const serErrorctx = useContext(LoginContext).setErrorhandler;
  const signupHandler = (
    event,
    { enteredUsername, enteredEmail, enteredPassword }
  ) => {
    event.preventDefault();
    const graphqlQuery = {
      query: `mutation {
        createUser(userInput:{name:"${enteredUsername}" password:"${enteredPassword}" email:"${enteredEmail}"})
        {
          email
          name
          password
        }
      }
            
            `,
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          serErrorctx(resData.errors[0]);
          throw new Error(
            "User creation failed, enter a valid email and password"
          );
        }
        if (resData.errors) {
          serErrorctx(resData.errors[0]);
          throw new Error("User creation failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <SignupForm signupHandler={signupHandler} />
      <Outlet />
      {/* outlet is for react router settings to display the page */}
    </Fragment>
  );
}
export default Signup;
