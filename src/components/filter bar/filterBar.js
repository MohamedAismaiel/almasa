import { useEffect, useState } from "react";
import Select from "react-select";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { MdOutlineExpandMore } from "react-icons/md";
import FilterOptions from "../UI/filterOptions";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
function FilterBar(props) {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [enteredLocation, setEnteredLocation] = useState("");

  // const [dropdown, toggleDropDown] = useState(false);
  const [rentType, setRentType] = useState(null);
  const [apartmentType, setApartmentType] = useState(null);
  const [bedroomsNumbers, setBedroomsNumbers] = useState([]);
  const [bathroomsNumbers, setBathroomsNumbers] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  let rentTypeInitialValue =
    location.pathname.split("/")[1] === "commerical-sale" || "commerical-rent"
      ? location.pathname.split("/")[1].replace("-", " ")
      : location.pathname.split("/")[1];

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

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setEnteredLocation(value);
    setCoordinates(latlng);
  };
  const rentOptions = [
    { value: "rent", label: "Rent" },
    { value: "sale", label: "Sale" },
    { value: "commercial rent", label: "Commercial rent" },
    { value: "commercial sale", label: "Commercial sale" },
  ];

  let multiValueContainer = ({ selectProps, data }) => {
    const allSelected = selectProps.value;
    let roomsNumber = [];
    let outputLabel;
    // const index = allSelected.findIndex((selected) => selected.label === label);
    // const isLastSelected = index === allSelected.length - 1;
    // const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ", ";
    // const val = `${label}${labelSuffix}`;
    // console.log(val);
    // return val;
    // // 1,4,5 beds or 1-6 beds
    function compare(a, b) {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    }
    allSelected.sort(compare);

    const label = data.value;
    const index = allSelected.findIndex((selected) => selected.value === label);
    const isLastSelected = index === allSelected.length - 1;
    const labelSuffix = isLastSelected ? ` beds` : ", ";

    const val = `${allSelected[index].value}${labelSuffix}`;

    return val;
  };
  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "15rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "4rem",
    }),
  };

  const getFormValues = (
    apartmentType = null,
    bedroomsNumbers = [],
    bathroomsNumbers = [],
    minPrice = null,
    maxPrice = null
  ) => {
    setTimeout(() => setApartmentType(apartmentType), 0);
    setTimeout(() => setBedroomsNumbers(bedroomsNumbers), 0);
    setTimeout(() => setBathroomsNumbers(bathroomsNumbers), 0);
    setTimeout(() => setMinPrice(minPrice), 0);
    setTimeout(() => setMaxPrice(maxPrice), 0);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    getFormValues();
    const bathroomsNumberStringfy = JSON.stringify(bathroomsNumbers);
    const bedroomsNumberStringfy = JSON.stringify(bedroomsNumbers);
    const rentTypeStringfy = JSON.stringify(rentType);
    const apartmentTypeStringfy = JSON.stringify(apartmentType);
    setTimeout(() => {
      const graphqlQuery = {
        query: `query filterdApartments($rentType:String,$apartmentType:String,$bedroomsNumbers:String,$bathroomsNumbers:String,$maxPrice:String,$minPrice:String)
      {
        filterdApartments(filteredApartmentsInput:{rentType:$rentType apartmentType:$apartmentType  bedroomsNumbers:$bedroomsNumbers  bathroomsNumbers:$bathroomsNumbers  maxPrice:$maxPrice minPrice:$minPrice }  )

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
            id
          }
          spaceUnit
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
          rentType: rentTypeStringfy,
          apartmentType: apartmentTypeStringfy,
          maxPrice: maxPrice,
          minPrice: minPrice,
          bathroomsNumbers: bathroomsNumberStringfy,
          bedroomsNumbers: bedroomsNumberStringfy,
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
          const apartmentTypeInUrl =
            apartmentType === null ? "allTypes" : apartmentType;
          const bedsInUrl =
            bedroomsNumbers.length === 0
              ? "all"
              : JSON.stringify(bedroomsNumbers);
          const BathsInUrl =
            bathroomsNumbers.length === 0
              ? "all"
              : JSON.stringify(bathroomsNumbers);
          const minPriceInUrl = minPrice === null ? "min" : minPrice;
          const maxPriceInUrl = maxPrice === null ? "max" : maxPrice;
          if (rentType !== rentTypeInitialValue) {
            navigate({
              pathname: `/${rentType}`,
              search: createSearchParams({
                bor: rentType,
                type: apartmentTypeInUrl,
                beds: bedsInUrl,
                baths: BathsInUrl,
                minP: minPriceInUrl,
                maxP: maxPriceInUrl,
              }).toString(),
            });
          } else {
            props.getValues(resData);

            const text = `${location.pathname}?bor=${rentType}&type=${apartmentTypeInUrl}&beds=${bedsInUrl}&baths=${BathsInUrl}&minP=${minPriceInUrl}&maxP=${maxPriceInUrl}`;
            window.history.replaceState(null, "", text);
          }
        })
        .then(() => {
          // if (Array.isArray(rentType) && rentType[0] !== rentTypeInitialValue) {
          //   navigate(`/${rentType}${location.search}`);
          // }
          // 7ot el props.getvalues gwa el if
        });
    }, 100);
  };
  // const bedroomHandler = (e) => {
  //   let roomnumbers = [];
  //   e.forEach((element) => {
  //     roomnumbers.push(+element.value);
  //   });
  //   setBedroomsNumbers(roomnumbers);
  // };
  // const bathroomHandler = (e) => {
  //   let roomnumbers = [];
  //   e.forEach((element) => {
  //     roomnumbers.push(+element.value);
  //   });
  //   setBathroomsNumbers(roomnumbers);
  // };

  function onPlaceSelect(value) {
    console.log(value);
  }

  function onSuggectionChange(value) {
    console.log(value);
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
              limit={5}
              placeSelect={onPlaceSelect}
              suggestionsChange={onSuggectionChange}
              skipSelectionOnArrowKey={true}
            />
          </GeoapifyContext>
          {/* <PlacesAutocomplete
            value={enteredLocation}
            onChange={setEnteredLocation}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({ placeholder: "Search for a city" })}
                />
                <div className="loadingContainer">
                  {loading ? (
                    <div className="loadingContainer-loading">loading...</div>
                  ) : null}
                  {suggestions.map((suggestion, i) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      width: "35rem",
                      fontSize: "1.6rem",
                      padding: "1rem",
                    };
                    let suggestionDisplay;
                    if (suggestion.description.length >= 44) {
                      suggestionDisplay = `${suggestion.description
                        .slice(0, 38)
                        .concat("...")}`;
                    } else {
                      suggestionDisplay = `${suggestion.description}`;
                    }
                    return (
                      <div
                        key={i}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestionDisplay}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete> */}
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
