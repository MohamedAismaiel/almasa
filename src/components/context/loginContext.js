import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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
  isPriceMonthlySearch: () => {},
  isPriceDailySearch: () => {},
  setDetailedApartment: () => {},
  setCardClickedApartment: () => {},
  initialFetching: (
    type,
    apartmentType,
    bedroomsNumbers,
    bathroomsNumbers,
    minPrice,
    maxPrice,
    dailyOrMonthly
  ) => {},

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
  isDailySearch: false,
  // typeInSearch: "tp",
  // bedroomsInSearch: "bd",
  // bathroomsInSearch: "bt",
  // minPriceInSearch: "mn",
  // maxPriceInSearch: "mx",
  // dailyOrMonthlyInSearch: "dM",
});

const LoginProvider = (props) => {
  const [isAuth, setIsAuth] = useState(async () => {
    const token = localStorage.getItem("token");

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
    await fetch("http://localhost:8080/graphql", {
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
          return resData.data.isAuthenticated.isAuth;
        } else return false;
      });
  });
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [imageIsShown, setImageIsShown] = useState(false);
  const [emailForm, setemailForm] = useState(false);
  const [mapShown, setMapShown] = useState(false);
  const [isDailySearch, setIsDailySearch] = useState(false);
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
  const isPriceMonthlySearch = () => {
    setIsDailySearch(false);
  };
  const isPriceDailySearch = () => {
    setIsDailySearch(true);
  };
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

  const initialFetching = (
    type,
    apartmentType,
    bedroomsNumbers,
    bathroomsNumbers,
    minPrice,
    maxPrice,
    dailyOrMonthly
  ) => {
    const graphqlQuery = {
      query: `query filterdApartments($rentType:String,$apartmentType:String,$bedroomsNumbers:String,$bathroomsNumbers:String,$maxPrice:String,$minPrice:String,$dailyOrMonthly:String)
      {
        filterdApartments(filteredApartmentsInput:{rentType:$rentType apartmentType:$apartmentType  bedroomsNumbers:$bedroomsNumbers  bathroomsNumbers:$bathroomsNumbers  maxPrice:$maxPrice minPrice:$minPrice dailyOrMonthly:$dailyOrMonthly }  )

        {
          _id
        type
        rentOrSale
        isAvaliable
        price
        location {
          city
          country
          address
        }
        space
        rooms
        description
        finishing
        bathrooms
        photos {
          location
          isLanding
          _id
        }
        spaceUnit
        dailyRentPrice
        amenities
        paymentType
        deliveryDate
        refrenceName
        mainHeader
        createdAt
        updatedAt
        }
      }
      `,
      variables: {
        rentType: type,
        apartmentType,
        maxPrice,
        minPrice,
        bathroomsNumbers,
        bedroomsNumbers,
        dailyOrMonthly,
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
          // setApartments(resData.data.filterdApartments);
          setApartments(resData.data.filterdApartments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        initialFetching,
        isDailySearch,
        isPriceMonthlySearch,
        isPriceDailySearch,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
