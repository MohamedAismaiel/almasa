import { useEffect, useState } from "react";
import Select from "react-select";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

import FilterOptions from "../UI/filterOptions";

import {
  useLocation,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { useContext } from "react";
import { LoginContext } from "../context/loginContext";

function FilterBar(props) {
  const [apartmentType, setApartmentType] = useState(null);
  const [bedroomsNumbers, setBedroomsNumbers] = useState([]);
  const [bathroomsNumbers, setBathroomsNumbers] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [dailyOrMonthly, setDailyOrMonthly] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isPriceDailySearch = useContext(LoginContext).isPriceDailySearch;
  const isPriceMonthlySearch = useContext(LoginContext).isPriceMonthlySearch;

  let rentTypeInitialValue =
    location.pathname.split("/")[1] === "commerical-sale" || "commerical-rent"
      ? location.pathname.split("/")[1].replace("-", " ")
      : location.pathname.split("/")[1];
  const [rentType, setRentType] = useState(rentTypeInitialValue);

  useEffect(() => {
    const controller = new AbortController();

    let rentTypeDefaultValue =
      location.pathname.split("/")[1] === "commerical-sale" || "commerical-rent"
        ? location.pathname.split("/")[1].replace("-", " ")
        : location.pathname.split("/")[1];

    setRentType(rentTypeDefaultValue);
    return () => {
      controller.abort();
    };
  }, [location.pathname]);

  const rentOptions = [
    { value: "rent", label: "Rent" },
    { value: "sale", label: "Sale" },
    { value: "commercial rent", label: "Commercial rent" },
    { value: "commercial sale", label: "Commercial sale" },
  ];

  const getFormValues = (
    apartmentType = null,
    bedroomsNumbers = [],
    bathroomsNumbers = [],
    minPrice = null,
    maxPrice = null,
    dailyOrMonthly
  ) => {
    rentType === "sale" || rentType === "commercial sale"
      ? setTimeout(() => setDailyOrMonthly(null), 0)
      : setTimeout(() => setDailyOrMonthly(dailyOrMonthly), 0);
    setTimeout(() => setApartmentType(apartmentType), 0);
    setTimeout(() => setBedroomsNumbers(bedroomsNumbers), 0);
    setTimeout(() => setBathroomsNumbers(bathroomsNumbers), 0);
    setTimeout(() => setMinPrice(minPrice), 0);
    setTimeout(() => setMaxPrice(maxPrice), 0);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    getFormValues();

    let searchingParameters = {};
    if (rentType) {
      searchingParameters.bor = rentType;
    }
    if (apartmentType) {
      searchingParameters.type = apartmentType;
    }
    if (maxPrice) {
      searchingParameters.maxP = maxPrice;
    }
    if (minPrice) {
      searchingParameters.minP = minPrice;
    }
    if (bathroomsNumbers.length !== 0) {
      searchingParameters.baths = JSON.stringify(bathroomsNumbers);
    }
    if (bedroomsNumbers.length !== 0) {
      searchingParameters.beds = JSON.stringify(bedroomsNumbers);
    }
    if (
      dailyOrMonthly &&
      rentType !== "sale" &&
      rentType !== "commercial sale"
    ) {
      searchingParameters.dOrM = dailyOrMonthly;
    }
    if (searchedLocation) {
      searchingParameters.cy = searchedLocation.city;
    }
    if (searchedLocation) {
      searchingParameters.add = searchedLocation.address;
    }

    if (rentType !== rentTypeInitialValue) {
      // let dailyOrMonthlyInUrlInNavigation =
      //   rentType === "rent" || rentType === "commercial-rent"
      //     ? "monthly"
      //     : null;

      navigate({
        pathname: `/${rentType}`,
        search: createSearchParams({
          ...searchingParameters,
          // dOrM: dailyOrMonthlyInUrlInNavigation,
        }).toString(),
      });
      return;
    }

    const bathroomsNumberStringfy = JSON.stringify(bathroomsNumbers);
    const bedroomsNumberStringfy = JSON.stringify(bedroomsNumbers);

    const rentTypeStringfy = JSON.stringify(rentType);
    const apartmentTypeStringfy = JSON.stringify(apartmentType);
    const locationStringfy =
      searchedLocation === null ? null : JSON.stringify(searchedLocation);
    setTimeout(() => {
      const graphqlQuery = {
        query: `query filterdApartments($rentType:String,$apartmentType:String,$bedroomsNumbers:String,$bathroomsNumbers:String,$maxPrice:String,$minPrice:String,$location:String,$dailyOrMonthly:String)
      {
        filterdApartments(filteredApartmentsInput:{rentType:$rentType apartmentType:$apartmentType  bedroomsNumbers:$bedroomsNumbers  bathroomsNumbers:$bathroomsNumbers  maxPrice:$maxPrice minPrice:$minPrice location:$location dailyOrMonthly:$dailyOrMonthly}  )

        {
          _id
          type
          rentOrSale
          isAvaliable
          price
          location
          {
            address
            city
            country
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
          amenities
          paymentType
          deliveryDate
          refrenceName
          mainHeader
          dailyRentPrice
          createdAt
          updatedAt
        }
      }
      `,
        variables: {
          rentType: rentTypeStringfy,
          apartmentType: apartmentTypeStringfy,
          maxPrice,
          minPrice,
          bathroomsNumbers: bathroomsNumberStringfy,
          bedroomsNumbers: bedroomsNumberStringfy,
          location: locationStringfy,
          dailyOrMonthly,
        },
      };
      return fetch("http://localhost:8080/graphql", {
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
          props.getValues(resData);

          setSearchParams({
            ...searchingParameters,
          });

          (dailyOrMonthly === "monthly" || dailyOrMonthly === null) &&
            isPriceMonthlySearch();
          dailyOrMonthly === "daily" && isPriceDailySearch();
          // const text = `${location.pathname}?bor=${rentType}&type=${apartmentTypeInUrl}&beds=${bedsInUrl}&baths=${BathsInUrl}&minP=${minPriceInUrl}&maxP=${maxPriceInUrl}&dOrM=${dailyOrMonthly}`;

          // window.history.replaceState(null, "", text);
        });
    }, 100);
  };

  function onPlaceSelect(value) {
    // console.log(value);
    if (!value) {
      setSearchedLocation(null);
      return;
    }

    let updatedAdress;
    let modifiedSearchedLocation;
    value.properties.datasource.raw["name:en"] === undefined
      ? (updatedAdress = value.properties.address_line1)
      : (updatedAdress = value.properties.datasource.raw["name:en"]);
    modifiedSearchedLocation = {
      address: updatedAdress,
      city: value.properties.state,
    };
    setSearchedLocation(modifiedSearchedLocation);
  }

  function onSuggectionChange(value) {}

  function suggestionsFilter(suggestions) {
    const processedStreets = [];

    const filtered = suggestions.filter((value) => {
      if (
        /[\u0600-\u06FF]/.test(value.properties.address_line1) ||
        value.properties.datasource.sourcename === "whosonfirst"
      ) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    });

    return filtered;
  }
  return (
    <section className="filterBar">
      <form
        className="filterBar-inputsContainer"
        onSubmit={submitFormHandler}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="filterBar-inputsContainer-locationInput">
          <GeoapifyContext apiKey="d58fcb81a23e4d69b4496ae7bcb6f54e">
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter address here"
              limit={10}
              lang={"en"}
              placeSelect={onPlaceSelect}
              suggestionsChange={onSuggectionChange}
              skipSelectionOnArrowKey={true}
              filterByCountryCode={["eg", "ae"]}
              suggestionsFilter={suggestionsFilter}
              // value={"Madinaty, Cairo, Egypt"}
              // type={"state"}
            />
          </GeoapifyContext>
        </div>
        <Select
          isSearchable={false}
          options={rentOptions}
          placeholder="Rent"
          className="filterBar-inputsContainer-typeInput"
          isClearable={false}
          blurInputOnSelect="true"
          defaultValue={{
            label:
              rentTypeInitialValue.charAt(0).toUpperCase() +
              rentTypeInitialValue.slice(1),
            value: rentTypeInitialValue,
          }}
          value={{
            label:
              rentType === "commercial-sale" || rentType === "commercial-rent"
                ? rentType.charAt(0).toUpperCase() +
                  rentType.slice(1).replace("-", " ")
                : rentType.charAt(0).toUpperCase() + rentType.slice(1),
            value: rentType,
          }}
          onChange={(e) => {
            if (!e) {
              setRentType(null);
              return;
            }
            if (
              e.value === "commercial rent" ||
              e.value === "commercial sale"
            ) {
              setRentType(e.value.replace(" ", "-"));
            } else {
              setRentType(e.value);
            }
          }}
        />

        <FilterOptions rentType={rentType} getFormValues={getFormValues} />
        <button type="submit">Find</button>
      </form>
    </section>
  );
}
export default FilterBar;
