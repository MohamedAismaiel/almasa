import { Fragment, useContext } from "react";
import { LoginContext } from "../context/loginContext";
import {
  FaParking as Parkingarea,
  FaRegSnowflake as Airconditioned,
  FaWifi as Wifi,
  FaSwimmingPool as Jacuzzi,
  FaUmbrellaBeach as Beachaccess,
} from "react-icons/fa";
import { GiPalmTree as Privategarden } from "react-icons/gi";
import { CgGym as Gymaccess } from "react-icons/cg";
import {
  MdBalcony as Balcony,
  MdPets as Petsallowed,
  MdSecurity as Security,
  MdPool as Privatepool,
  MdElevator as Elevator,
  MdOutlineSportsTennis as Clubaccess,
} from "react-icons/md";
function ApartmentAmenities() {
  const apartment = useContext(LoginContext).singleApartment;
  if (apartment.amenities) {
    return (
      <div className="amenities">
        <h3>Amenities</h3>
        <div className="amenities-box">
          {apartment.amenities.map((amenity, i) => {
            let Svg;
            if (amenity === "Private garden") {
              Svg = Privategarden;
            }
            if (amenity === "Balcony") {
              Svg = Balcony;
            }
            if (amenity === "Parking area") {
              Svg = Parkingarea;
            }
            if (amenity === "Pets allowed") {
              Svg = Petsallowed;
            }
            if (amenity === "Security") {
              Svg = Security;
            }
            if (amenity === "Jacuzzi") {
              Svg = Jacuzzi;
            }
            if (amenity === "Private pool") {
              Svg = Privatepool;
            }
            if (amenity === "Elevator") {
              Svg = Elevator;
            }
            if (amenity === "Air conditioned") {
              Svg = Airconditioned;
            }
            if (amenity === "Wifi") {
              Svg = Wifi;
            }
            if (amenity === "Beach access") {
              Svg = Beachaccess;
            }
            if (amenity === "Club access") {
              Svg = Clubaccess;
            }
            if (amenity === "Gym access") {
              Svg = Gymaccess;
            }
            return (
              <div key={i}>
                <Svg />
                <p>{amenity}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else return <></>;
}
export default ApartmentAmenities;
