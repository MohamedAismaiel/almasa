import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import { BiBuildingHouse } from "react-icons/bi";
import { BiBed } from "react-icons/bi";
import { BiBath } from "react-icons/bi";
import { GiResize } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import { BsBricks } from "react-icons/bs";
import ApartmentPriceDetailsAbs from "./apartmentDetailPriceAbsolute";

function ApartmentDetailsSummary() {
  const apartment = useContext(LoginContext).singleApartment;

  if (apartment._id) {
    const locationEdited =
      apartment.location.split(",").slice(0, 1) +
      apartment.location.split(",").slice(-1);

    console.log(locationEdited);
    return (
      <div className="detailsArea">
        <p className="detailsArea-summary">
          {apartment.type} for {apartment.rentOrSale} in {locationEdited}
        </p>
        <p className="detailsArea-mainHeader">{apartment.mainHeader}</p>
        <p className="detailsArea-deliverDate">
          Delivered in : {apartment.deliveryDate}
        </p>
        <div className="detailsArea-allDetails">
          <div className="detailsArea-allDetails-group1">
            <div className="detailsArea-allDetails-group1-type">
              <p className="detailsArea-allDetails-group1-type-1">
                <BiBuildingHouse size={18} />
                &nbsp; Property type:
              </p>
              <p className="detailsArea-allDetails-group1-type-2">
                {apartment.type}
              </p>
            </div>
            {/* Bedrooms */}
            <div className="detailsArea-allDetails-group1-bedroom">
              <p className="detailsArea-allDetails-group1-bedroom-1">
                <BiBed size={18} />
                &nbsp; Bedrooms:
              </p>
              <p className="detailsArea-allDetails-group1-bedroom-2">
                {apartment.rooms}
              </p>
            </div>
            {/* bathrooms */}
            <div className="detailsArea-allDetails-group1-bathrooms">
              <p className="detailsArea-allDetails-group1-bathrooms-1">
                <BiBath size={18} />
                &nbsp; Bathrooms:
              </p>
              <p className="detailsArea-allDetails-group1-bathrooms-2">
                {apartment.bathrooms}
              </p>
            </div>
          </div>
          <div className="detailsArea-allDetails-group2">
            {/* size */}
            <div className="detailsArea-allDetails-group2-size">
              <p className="detailsArea-allDetails-group2-size-1">
                <GiResize size={18} />
                &nbsp; Property Size:
              </p>
              <p className="detailsArea-allDetails-group2-size-2">
                {apartment.space} {apartment.spaceUnit}
              </p>
            </div>
            {/* rent or sale */}
            <div className="detailsArea-allDetails-group2-rentOrSale">
              <p className="detailsArea-allDetails-group2-rentOrSale-1">
                <BsQuestionCircle size={18} />
                &nbsp; Rent or sale:
              </p>
              <p className="detailsArea-allDetails-group2-rentOrSale-2">
                {apartment.rentOrSale}
              </p>
            </div>
            {/* Finishing */}
            <div className="detailsArea-allDetails-group2-finishing">
              <p className="detailsArea-allDetails-group2-finishing-1">
                <BsBricks size={18} />
                &nbsp; finishing:
              </p>
              <p className="detailsArea-allDetails-group2-finishing-2">
                {apartment.finishing}
              </p>
            </div>
          </div>
        </div>
        <ApartmentPriceDetailsAbs />
      </div>
    );
  }
  return <></>;
}

export default ApartmentDetailsSummary;

// type for sale in location

//type
//rent or sale
//bedrooms
//bathrooms
//size
// finished type
