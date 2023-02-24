import React from "react";

import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { LoginContext } from "../context/loginContext";
import FilterBar from "../filter bar/filterBar";

import Routing from "../routing";

function Nav() {
  const logoutHandler = useContext(LoginContext).logoutHandler;
  const isAuth = useContext(LoginContext).isAuth;
  const location = useLocation();
  const rentType = JSON.stringify(location.pathname.split("/")[1]);
  const setApartmentsCtx = useContext(LoginContext).setApartmentsHandler;

  const fetchInitialApartments = (e) => {
    if (location.search.length === 0 || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

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
        rentType,
        apartmentType: null,
        maxPrice: null,
        minPrice: null,
        bathroomsNumbers: JSON.stringify([]),
        bedroomsNumbers: JSON.stringify([]),
        dailyOrMonthly: null,
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
          setApartmentsCtx(resData.data.filterdApartments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <header>
      {isAuth ? (
        <nav>
          <ul className="nav-links">
            <div className="nav-links-group1">
              <Link to="/">Logo</Link>
              <Link
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
                to="/sale"
              >
                Sale
              </Link>
              <Link
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
                to="/rent"
              >
                Rent
              </Link>
              <Link
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
                to="/commercial-sale"
              >
                Commercial sale
              </Link>
              <Link
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
                to="/commercial-rent"
              >
                Commercial rent
              </Link>
              <Link to="/create-apartment">create apartment</Link>
            </div>
            <div className="nav-links-group2">
              <Link to="/login" onClick={logoutHandler}>
                <button type="button" className="button button-logout">
                  Logout
                </button>
              </Link>
              <Link to="/favourites">favourites</Link>
            </div>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="nav-links">
            <div className="nav-links-group1">
              <Link to="/">Logo</Link>
              <Link
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
                to="/sale"
              >
                Sale
              </Link>
              <Link
                to="/rent"
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
              >
                Rent
              </Link>
              <Link
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
                to="/commercial-sale"
              >
                Commercial sale
              </Link>
              <Link
                onClick={(e) => {
                  fetchInitialApartments(e);
                }}
                to="/commercial-rent"
              >
                Commercial rent
              </Link>
            </div>
            <div className="nav-links-group2">
              <Link to="/login">
                <button type="button" className="button button-logout">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="button button-logout">
                  Signup
                </button>
              </Link>
              <Link to="/favourites">favourites</Link>
            </div>
          </ul>
        </nav>
      )}
      <Routing />
    </header>
  );
}

export default Nav;
