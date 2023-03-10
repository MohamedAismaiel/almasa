import React, { Fragment, useContext, useEffect, useState } from "react";
import { LoginContext } from "./components/context/loginContext";
import FilterBar from "./components/filter bar/filterBar";
import EmailForm from "./components/Modal/emailForm";
import Images from "./components/Modal/images";
import Map from "./components/Modal/map";
import Nav from "./components/navigation/nav";

function App(props) {
  // const isAuth = useContext(LoginContext).isAuth;
  const setStatusctx = useContext(LoginContext).isAthStatus;
  const setTokenctx = useContext(LoginContext).setTokenHandler;
  const setUseridctx = useContext(LoginContext).setUseridHandler;
  // const setAppCtx = useContext(LoginContext).setApartmentsHandler;
  // const token = useContext(LoginContext).token;
  const logoutHandler = useContext(LoginContext).logoutHandler;
  const setAutoLogout = useContext(LoginContext).setAutoLogout;
  const imageGalleryIsShown = useContext(LoginContext).imageIsShown;
  const emailFormShown = useContext(LoginContext).emailForm;
  const mapShownctx = useContext(LoginContext).mapShown;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");
    const graphqlQuery = {
      query: `query isAuthenticated ($token:String)
      {
        isAuthenticated(token:$token)
        {isAuth}
      }`,
      variables: {
        token,
      },
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
        if (resData) {
          setStatusctx(resData.data.isAuthenticated.isAuth);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (!token || !expiryDate) {
      logoutHandler();
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");
    setStatusctx(true);
    setTokenctx(token);
    setUseridctx(userId);
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
  }, [token]);

  return (
    <Fragment>
      {mapShownctx && <Map />}
      {emailFormShown && <EmailForm />}
      {imageGalleryIsShown && <Images />}
      <Nav />
    </Fragment>
  );
}

export default App;
