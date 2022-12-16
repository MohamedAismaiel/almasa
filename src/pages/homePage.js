import { useState } from "react";
import FilterOptions from "../components/UI/filterOptions";
import { createSearchParams, useNavigate } from "react-router-dom";

function HomePage() {
  const [buyOrRent, setBuyOrRent] = useState("sale");
  const [apartmentType, setApartmentType] = useState(null);
  const [bedroomsNumbers, setBedroomsNumbers] = useState([]);
  const [bathroomsNumbers, setBathroomsNumbers] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

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
  let navigate = useNavigate();

  const buyOptionClassname =
    buyOrRent === "sale"
      ? "homepage-wallpaper-boxContainer-form-group1-optionBuy homepage-wallpaper-boxContainer-form-group1-optionBuy-active"
      : "homepage-wallpaper-boxContainer-form-group1-optionBuy";
  const rentOptionClassname =
    buyOrRent === "rent"
      ? "homepage-wallpaper-boxContainer-form-group1-optionRent homepage-wallpaper-boxContainer-form-group1-optionRent-active "
      : "homepage-wallpaper-boxContainer-form-group1-optionRent hom";

  const onSubmitHandler = (e) => {
    e.preventDefault();
    getFormValues();
    setTimeout(
      () =>
        navigate({
          pathname: `/${buyOrRent}`,
          search: createSearchParams({
            bor: buyOrRent,
            type: apartmentType === null ? "allTypes" : apartmentType,
            beds:
              bedroomsNumbers.length === 0
                ? "all"
                : JSON.stringify(bedroomsNumbers),
            baths:
              bathroomsNumbers.length === 0
                ? "all"
                : JSON.stringify(bathroomsNumbers),
            minP: minPrice === null ? "min" : minPrice,
            maxP: maxPrice === null ? "max" : maxPrice,
          }).toString(),
        }),
      100
    );
  };
  return (
    <div className="homepage">
      <div className="homepage-wallpaper">
        <div className="homepage-wallpaper-boxContainer">
          <div className="homepage-wallpaper-boxContainer-title">
            <p>Search for you new home</p>
          </div>
          <form
            onSubmit={onSubmitHandler}
            className="homepage-wallpaper-boxContainer-form"
          >
            <div className="homepage-wallpaper-boxContainer-form-group1">
              <div
                data-value="sale"
                className={buyOptionClassname}
                onClick={(e) => {
                  setBuyOrRent(e.target.dataset.value);
                }}
              >
                Buy
              </div>
              <div
                data-value="rent"
                className={rentOptionClassname}
                onClick={(e) => {
                  setBuyOrRent(e.target.dataset.value);
                }}
              >
                Rent
              </div>
            </div>
            <div className="homepage-wallpaper-boxContainer-form-group2">
              <FilterOptions getFormValues={getFormValues} />
              <button className="button button-filterButton" type="submit">
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
