import { Fragment, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { MdOutlineExpandMore } from "react-icons/md";
import { useLocation, useSearchParams } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import { useContext } from "react";

function FilterOptions(props) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [maxPriceIsTouched, setMaxPriceIsTouched] = useState(false);
  // const isPriceDailySearch = useContext(LoginContext).isPriceDailySearch;
  // const isPriceMonthlySearch = useContext(LoginContext).isPriceMonthlySearch;

  let rentType =
    location.pathname.split("/")[1] === "commerical-sale" || "commerical-rent"
      ? location.pathname.split("/")[1].replace("-", " ")
      : location.pathname.split("/")[1];

  let dailyOrMonthlyInitialValue;
  if (
    (rentType === "commercial rent" || rentType === "rent") &&
    searchParams.get("dOrM") === null
  ) {
    dailyOrMonthlyInitialValue = "monthly";
  } else if (
    (rentType === "commercial rent" || rentType === "rent") &&
    searchParams.get("dOrM") !== null
  ) {
    dailyOrMonthlyInitialValue = searchParams.get("dOrM");
  } else dailyOrMonthlyInitialValue = null;

  const [dailyOrMonthly, setDailyOrMonthly] = useState(
    dailyOrMonthlyInitialValue
  );
  const initialDailyOrMonthlyActiceClass =
    searchParams.get("dOrM") === "monthly" || searchParams.get("dOrM") === null
      ? "monthly"
      : "daily";
  const [monthlyClassActive, setMonthlyClassActive] = useState(
    initialDailyOrMonthlyActiceClass === "monthly" && true
  );

  const [dailyClassActive, setDailyClassActive] = useState(
    initialDailyOrMonthlyActiceClass === "daily" && true
  );

  const apartmentTypeInitialValue =
    searchParams.get("type") === null || searchParams.get("type") === "allTypes"
      ? null
      : searchParams.get("type");

  const [apartmentType, setApartmentType] = useState(apartmentTypeInitialValue);

  const bedroomsInitialValue =
    searchParams.get("beds") === null || searchParams.get("beds") === "all"
      ? null
      : JSON.parse(searchParams.get("beds"));

  let displayBedroomInitialValue;

  if (bedroomsInitialValue) {
    displayBedroomInitialValue = JSON.parse(searchParams.get("beds")).map(
      (el) => {
        let label;
        if (el === 1) {
          label = `${el} bed`;
        } else label = `${el} beds`;
        return {
          value: `${el}`,
          label,
        };
      }
    );
  }
  const [bedroomsNumbers, setBedroomsNumbers] = useState(
    bedroomsInitialValue === null ? [] : bedroomsInitialValue
  );
  const bathroomsInitialValue =
    searchParams.get("baths") === null || searchParams.get("baths") === "all"
      ? null
      : JSON.parse(searchParams.get("baths"));
  let displayBathroomInitialValue;

  if (bathroomsInitialValue) {
    displayBathroomInitialValue = JSON.parse(searchParams.get("baths")).map(
      (el) => {
        let label;
        if (el === 1) {
          label = `${el} bath`;
        } else label = `${el} baths`;
        return {
          value: `${el}`,
          label,
        };
      }
    );
  }

  const [bathroomsNumbers, setBathroomsNumbers] = useState(
    bathroomsInitialValue === null ? [] : bathroomsInitialValue
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minP") === "min" ? null : searchParams.get("minP")
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxP") === "max" ? null : searchParams.get("maxP")
  );
  const [dropdown, toggleDropDown] = useState(false);
  const priceButtonRef = useRef();
  const bedroomRef = useRef();
  const bathroomRef = useRef();
  const apartmentOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "studio", label: "Studio" },
    { value: "compound", label: "Compound" },
    { value: "villa", label: "Villa" },
    { value: "chalet", label: "Chalet" },
    { value: "duplex", label: "Duplex" },
    { value: "half floor", label: "Half floor" },
    { value: "full floor", label: "Full floor" },
    { value: "whole building", label: "Whole building" },
    { value: "warehouse", label: "Warehouse" },
    { value: "shop", label: "Shop" },
    { value: "medical facility", label: "Medical facility" },
    { value: "staff accommodation", label: "Staff accommodation" },
    { value: "show room", label: "Show room" },
    { value: "office", label: "Office" },
  ];
  const bedroomsOptions = [
    { value: "1", label: "1 bed" },
    { value: "2", label: "2 beds" },
    { value: "3", label: "3 beds" },
    { value: "4", label: "4 beds" },
    { value: "5", label: "5 beds" },
    { value: "6", label: "6 beds" },
    { value: "7", label: "7 beds" },
    { value: "7+", label: "7+ beds" },
  ];
  const bathroomsOptions = [
    { value: "1", label: "1 bath" },
    { value: "2", label: "2 baths" },
    { value: "3", label: "3 baths" },
    { value: "4", label: "4 baths" },
    { value: "5", label: "5 baths" },
    { value: "6", label: "6 baths" },
    { value: "7", label: "7 baths" },
    { value: "7+", label: "7+ baths" },
  ];

  let showRentPeriod;

  props.buyOrRent
    ? (showRentPeriod =
        rentType === "rent" ||
        rentType === "commercial rent" ||
        props.buyOrRent === "rent")
    : (showRentPeriod = rentType === "rent" || rentType === "commercial rent");

  const closeDropdown = (e) => {
    if (e.target.dataset.closeDrodown !== "false") {
      toggleDropDown(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "15rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      height: "3rem",
    }),
  };
  const bedroomHandler = (e, action) => {
    let roomnumbers = [];

    e.forEach((element) => {
      roomnumbers.push(+element.value);
    });
    setBedroomsNumbers(roomnumbers);
  };
  const bathroomHandler = (e) => {
    let roomnumbers = [];
    e.forEach((element) => {
      roomnumbers.push(+element.value);
    });
    setBathroomsNumbers(roomnumbers);
  };

  if (Object.keys(props).length > 0) {
    props.getFormValues(
      apartmentType,
      bedroomsNumbers,
      bathroomsNumbers,
      minPrice,
      maxPrice,
      dailyOrMonthly
    );
  }

  let multiValueContainer = ({ selectProps, data }) => {
    const allSelected = selectProps.value;

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
    let bedOrBath = data.label.includes("bed") === true ? "beds" : "baths";

    const index = allSelected.findIndex((selected) => selected.value === label);
    const isLastSelected = index === allSelected.length - 1;
    const labelSuffix = isLastSelected ? ` ${bedOrBath}` : ", ";

    const val = `${allSelected[index].value}${labelSuffix}`;

    return val;
  };

  useEffect(() => {
    if (location.search.length === 0) {
      setApartmentType(null);
      setMaxPrice(null);
      setMinPrice(null);
      bedroomRef.current.commonProps.clearValue();
      bathroomRef.current.commonProps.clearValue();
    }
  }, [location]);

  return (
    <Fragment>
      <Select
        isSearchable={false}
        value={apartmentOptions.filter(({ value }) => value === apartmentType)}
        options={apartmentOptions}
        placeholder="apartment type"
        className="filterBar-inputsContainer-apartmentInput"
        isClearable={true}
        blurInputOnSelect="true"
        maxMenuHeight="28rem"
        defaultValue={
          apartmentTypeInitialValue === null
            ? null
            : {
                label:
                  apartmentTypeInitialValue.charAt(0).toUpperCase() +
                  apartmentTypeInitialValue.slice(1),
                value: apartmentTypeInitialValue,
              }
        }
        onChange={(e) => {
          if (!e) {
            setApartmentType(null);
            return;
          }

          setApartmentType(e.value);
        }}
      />
      <Select
        ref={bedroomRef}
        options={bedroomsOptions}
        placeholder="bedrooms"
        isMulti="true"
        className="filterBar-inputsContainer-bedAndBathroomInput"
        isClearable="true"
        blurInputOnSelect="true"
        maxMenuHeight="28rem"
        menuPlacement="auto"
        hideSelectedOptions={false}
        isSearchable={false}
        styles={customStyles}
        defaultValue={
          bedroomsInitialValue === null ? null : displayBedroomInitialValue
        }
        components={{
          MultiValueContainer: multiValueContainer,
          // Option: CustomOption,
        }}
        onChange={bedroomHandler}
      />

      <Select
        ref={bathroomRef}
        isSearchable={false}
        options={bathroomsOptions}
        placeholder="bathrooms"
        isMulti="true"
        className="filterBar-inputsContainer-bedAndBathroomInput"
        isClearable="true"
        blurInputOnSelect="true"
        maxMenuHeight="28rem"
        components={{
          MultiValueContainer: multiValueContainer,
          // Option: CustomOption,
        }}
        styles={customStyles}
        defaultValue={
          bathroomsInitialValue === null ? null : displayBathroomInitialValue
        }
        hideSelectedOptions={false}
        onChange={bathroomHandler}
      />
      <div className="filterBar-inputsContainer-priceContiner">
        <div
          onClick={(e) => {
            toggleDropDown(!dropdown);
          }}
          className="filterBar-inputsContainer-priceContiner-selector"
          ref={priceButtonRef}
          data-close-drodown="false"
        >
          <p
            placeholder="price"
            className="filterBar-inputsContainer-priceContiner-selector-text"
            data-close-drodown="false"
          >
            {minPrice === null && maxPrice === null && "price"}

            {minPrice === null && maxPrice !== null && `Up to ${maxPrice} EGP`}

            {minPrice !== null &&
              maxPrice === null &&
              `From ${minPrice} EGP / `}

            {minPrice !== null &&
              maxPrice !== null &&
              `${minPrice} - ${maxPrice} EGP`}
          </p>
          <span
            className="filterBar-inputsContainer-priceContiner-selector-line"
            data-close-drodown="false"
          />
          <MdOutlineExpandMore
            size={23}
            className="filterBar-inputsContainer-priceContiner-selector-arrow"
            data-close-drodown="false"
          />
        </div>
        {
          dropdown && (
            <div
              className="filterBar-inputsContainer-priceContiner-dropdown"
              data-close-drodown="false"
            >
              <div
                className="filterBar-inputsContainer-priceContiner-dropdown-group1"
                data-close-drodown="false"
              >
                <input
                  onBlur={(e) => {
                    if (
                      +minPrice > +maxPrice &&
                      maxPriceIsTouched &&
                      maxPrice !== null
                    ) {
                      setMaxPrice((prevState) => {
                        setMinPrice(prevState);
                        return minPrice;
                      });
                    }
                  }}
                  className="filterBar-inputsContainer-priceContiner-dropdown-group1-minPrice"
                  placeholder="Min Price (EGP)"
                  data-close-drodown="false"
                  value={minPrice !== null ? minPrice : ""}
                  onChange={(e) => {
                    setMinPrice(e.target.value.replace(/\D/g, ""));
                    if (e.target.value.length === 0) {
                      setMinPrice(null);
                    }
                  }}
                />
                <span data-close-drodown="false">&#8212;</span>
                <input
                  onBlur={(e) => {
                    if (
                      +minPrice > +maxPrice &&
                      maxPriceIsTouched &&
                      maxPrice !== null
                    ) {
                      setMaxPrice((prevState) => {
                        setMinPrice(prevState);
                        return minPrice;
                      });
                    }
                  }}
                  className="filterBar-inputsContainer-priceContiner-dropdown-group1-maxPrice"
                  placeholder="Max Price (EGP)"
                  data-close-drodown="false"
                  id="maxPrice"
                  value={maxPrice !== null ? maxPrice : ""}
                  onChange={(e) => {
                    setMaxPriceIsTouched(true);
                    setMaxPrice(e.target.value.replace(/\D/g, ""));
                    if (maxPrice < minPrice) {
                    }
                    if (e.target.value.length === 0) {
                      setMaxPrice(null);
                    }
                  }}
                />
              </div>
              {showRentPeriod && (
                <div
                  className="filterBar-inputsContainer-priceContiner-dropdown-group2"
                  data-close-drodown="false"
                >
                  <p
                    className="filterBar-inputsContainer-priceContiner-dropdown-group2-text"
                    data-close-drodown="false"
                  >
                    Renting period
                  </p>
                  <div
                    className="filterBar-inputsContainer-priceContiner-dropdown-group2-period"
                    data-close-drodown="false"
                  >
                    <div
                      className={
                        monthlyClassActive
                          ? "filterBar-inputsContainer-priceContiner-dropdown-group2-period-monthly active"
                          : "filterBar-inputsContainer-priceContiner-dropdown-group2-period-monthly"
                      }
                      data-period="monthly"
                      data-close-drodown="false"
                      onClick={(e) => {
                        if (monthlyClassActive === true) {
                          return;
                        }
                        // isPriceMonthlySearch();
                        setDailyOrMonthly("monthly");
                        setMonthlyClassActive(true);
                        setDailyClassActive(false);
                      }}
                    >
                      Monthly
                    </div>
                    <div
                      className={
                        dailyClassActive
                          ? "filterBar-inputsContainer-priceContiner-dropdown-group2-period-daily active"
                          : "filterBar-inputsContainer-priceContiner-dropdown-group2-period-daily"
                      }
                      data-period="daily"
                      data-close-drodown="false"
                      onClick={(e) => {
                        if (dailyClassActive === true) {
                          return;
                        }
                        // isPriceDailySearch();
                        setDailyOrMonthly("daily");
                        setMonthlyClassActive(false);
                        setDailyClassActive(true);
                      }}
                    >
                      Daily
                    </div>
                  </div>
                </div>
              )}
              <p
                className="filterBar-inputsContainer-priceContiner-dropdown-group2-period-reset"
                data-close-drodown="false"
                onClick={(e) => {
                  if (maxPrice === null && minPrice === null) {
                    return;
                  }
                  setMaxPrice(null);
                  setMinPrice(null);
                }}
              >
                Reset
              </p>
            </div>
          )
          // (+minPrice > +maxPrice &&
          //   setMaxPrice((prevState) => {
          //     setMinPrice(prevState);
          //     return minPrice;
          //   }))
        }
      </div>
    </Fragment>
  );
}
export default FilterOptions;
