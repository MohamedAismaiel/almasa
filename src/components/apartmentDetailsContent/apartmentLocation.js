import { useContext } from "react";
import { LoginContext } from "../context/loginContext";

function ApartmentLocation() {
  const apartment = useContext(LoginContext).singleApartment;

  return (
    <div className="detailsLocation">
      <h3 className="detailsLocation-title">Location</h3>
      <div className="detailsLocation-map">
        <div className="detailsLocation-map-circle">
          <button>Map</button>
        </div>
        <div className="detailsLocation-map-text">
          <p>{apartment.location} </p>
        </div>
      </div>
    </div>
  );
}

export default ApartmentLocation;
