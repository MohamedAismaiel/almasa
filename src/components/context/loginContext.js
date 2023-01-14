import React, { useState } from "react";
import { useEffect } from "react";

export const LoginContext = React.createContext({
  isAuth: false,
  isAthStatus: () => {},
  setTokenHandler: () => {},
  setUseridHandler: () => {},
  setErrorhandler: () => {},
  logoutHandler: () => {},
  setApartmentsHandler: () => {},
  setAutoLogout: () => {},
  showImageGallery: () => {},
  hideImageGallery: () => {},
  showEmailForm: () => {},
  hideEmailForm: () => {},
  showMap: () => {},
  hideMap: () => {},
  setDetailedApartment: () => {},
  setCardClickedApartment: () => {},
  token: null,
  userId: null,
  error: [],
  apartments: [],
  imageIsShown: false,
  singleApartment: {},
  cardClickedApartment: null,
  furnishedAmentites: [],
  viewAmentites: [],
  amenitie: [],
  emailForm: false,
  mapShown: false,
});

const LoginProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [imageIsShown, setImageIsShown] = useState(false);
  const [emailForm, setemailForm] = useState(false);
  const [mapShown, setMapShown] = useState(false);
  const [cardClickedApartment, setCardClickedApartment] = useState(null);
  const [singleApartment, setSingleApartment] = useState({});

  const furnishedAmentites = ["furnished", "unfurnished", "partly furnished"];
  const viewAmentites = [
    "Garden view",
    "Sea view",
    "Park view",
    "Open view",
    "Street view",
  ];

  const amenitie = [
    "Private garden",
    "Balcony",
    "Parking area",
    "Pets allowed",
    "Security",
    "Jacuzzi",
    "Private pool",
    "Elevator",
    "Air conditioned",
    "Wifi",
    "Beach access",
    "Gym access",
    "Club access",
  ];

  const showImageGallery = () => {
    setImageIsShown(true);
  };
  const hideImageGallery = () => {
    setImageIsShown(false);
  };
  const showEmailForm = () => {
    setemailForm(true);
  };
  const hideEmailForm = () => {
    setemailForm(false);
  };
  const showMap = () => {
    setMapShown(true);
  };
  const hideMap = () => {
    setMapShown(false);
  };
  const setDetailedApartment = (apartment) => {
    setSingleApartment(apartment);
  };
  const setCardApartment = (apartment) => {
    setCardClickedApartment(apartment);
  };
  const isAthStatus = (state) => {
    setIsAuth(state);
  };
  const setTokenHandler = (token) => {
    setToken(token);
  };
  const setUseridHandler = (userId) => {
    setUserId(userId);
  };
  const setErrorhandler = (error) => {
    setError([error]);
  };
  const logoutHandler = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };
  const setApartmentsHandler = (apartmentss, appCreation = false) => {
    setApartments((apartments) => {
      let posts = [apartmentss, ...apartments];
      if (appCreation) {
        return posts;
      }
      return posts[0];
    });
  };
  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  return (
    <LoginContext.Provider
      value={{
        userId,
        token,
        setTokenHandler,
        setUseridHandler,
        isAthStatus,
        isAuth,
        error,
        setErrorhandler,
        logoutHandler,
        setApartmentsHandler,
        apartments,
        setAutoLogout,
        hideImageGallery,
        showImageGallery,
        imageIsShown,
        singleApartment,
        setDetailedApartment,
        furnishedAmentites,
        amenitie,
        viewAmentites,
        emailForm,
        showEmailForm,
        hideEmailForm,
        mapShown,
        hideMap,
        showMap,
        setCardApartment,
        cardClickedApartment,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
