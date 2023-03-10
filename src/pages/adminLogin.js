import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { LoginContext } from "../components/context/loginContext";
import LoginForm from "../components/loginForm/loginForm";

function AdminLogin(props) {
  const setStatusctx = useContext(LoginContext).isAthStatus;
  const setTokenctx = useContext(LoginContext).setTokenHandler;
  const setUseridctx = useContext(LoginContext).setUseridHandler;
  const isAuth = useContext(LoginContext).isAuth;
  const setAutoLogout = useContext(LoginContext).setAutoLogout;
  const loginHandler = (event, { enteredEmail, enteredPassword }) => {
    event.preventDefault();
    const graphqlQuery = {
      query: `query{
              login(email:"${enteredEmail}" password:"${enteredPassword}")
              {
                token
                userId
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
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (resData.errors) {
          throw new Error("User login failed");
        }
        setStatusctx(true);
        setTokenctx(resData.data.login.token);
        setUseridctx(resData.data.login.userId);

        localStorage.setItem("token", resData.data.login.token);
        localStorage.setItem("userId", resData.data.login.userId);

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {!isAuth ? <LoginForm loginHandler={loginHandler} /> : <h3>Signedin</h3>}
      <Outlet />
    </Fragment>
  );
}
export default AdminLogin;
