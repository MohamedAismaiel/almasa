import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../components/context/loginContext";
import ApartmentImages from "../components/apartmentDetailsContent/apartmentImages";
import ApartmentDetailsSummary from "../components/apartmentDetailsContent/apartmentDetailSummary";
import ApartmentPriceDetails from "../components/apartmentDetailsContent/priceDetailSection";
import ApartmentLocation from "../components/apartmentDetailsContent/apartmentLocation";
import ApartmentDescriptionDetails from "../components/apartmentDetailsContent/apartmentDescription";
import ApartmentAmenities from "../components/apartmentDetailsContent/apartmentAmenities";
import ApartmentRefrence from "../components/apartmentDetailsContent/ApartmentDetailRefrence";
function ApartmentDetail(props) {
  const { apartmentId } = useParams();
  const [apartment, setApartment] = useState({});
  let rentOrSaleParams = window.location.pathname.split("/")[1];
  const setSingleApartment = useContext(LoginContext).setDetailedApartment;
  useEffect(() => {
    const graphqlQuery = {
      query: `query Appartment($id:ID!) 
      {
        apartment(id:$id)
        
        { _id
          type
          rentOrSale
          isAvaliable
          price
          dailyRentPrice
          creator{name}
          location {
            city
            country
            address
            lat
            lon
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
          deliveryDate
          spaceUnit
          mainHeader
          amenities
          refrenceName
        
          createdAt
          updatedAt}
      } `,
      variables: { id: apartmentId },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (!resData) {
          return;
        }

        if (
          resData.data.apartment.rentOrSale !==
          rentOrSaleParams.replace("-", " ")
        ) {
          return;
        }
        setApartment(resData.data.apartment);
        setSingleApartment(resData.data.apartment);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (apartment._id) {
    return (
      <main>
        <div className="container">
          <ApartmentImages />
          <ApartmentDetailsSummary />
          {/* <ApartmentPriceDetails /> */}
          <ApartmentLocation />
          <ApartmentDescriptionDetails />
          <ApartmentAmenities />
          <ApartmentRefrence />
        </div>
      </main>
    );
  }

  return (
    <section>
      <h1>Loading</h1>
    </section>
  );
}
export default ApartmentDetail;
