import { Fragment, useContext, useEffect, useState } from "react";
import { LoginContext } from "../components/context/loginContext";
import ApartmentCard from "../components/apartmentCard/apartmentCard";
import FilterBar from "../components/filter bar/filterBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { GiDigDug } from "react-icons/gi";

function SalePage() {
  // const isAuth = useContext(LoginContext).isAuth;
  // const token = useContext(LoginContext).token;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [apartments, setApartments] = useState(null);
  useEffect(() => {
    const apartmentType =
      searchParams.get("type") === "allTypes" ||
      searchParams.get("type") === null
        ? null
        : JSON.stringify(searchParams.get("type"));

    const bedroomsNumbers =
      searchParams.get("beds") === "all" || searchParams.get("beds") === null
        ? JSON.stringify([])
        : searchParams.get("beds");

    const bathroomsNumbers =
      searchParams.get("baths") === "all" || searchParams.get("baths") === null
        ? JSON.stringify([])
        : searchParams.get("baths");
    const minPrice =
      searchParams.get("minP") === "min" || searchParams.get("minP") === null
        ? null
        : searchParams.get("minP");
    const maxPrice =
      searchParams.get("maxP") === "max" || searchParams.get("maxP") === null
        ? null
        : searchParams.get("minP");

    // const rentType = JSON.stringify([searchParams.get("bor")]);
    const rentType = JSON.stringify(location.pathname.split("/")[1]);

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
        rentType,
        apartmentType,
        maxPrice,
        minPrice,
        bathroomsNumbers,
        bedroomsNumbers,
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
          setApartments(resData.data.filterdApartments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (apartments != null) {
    const getValues = (values) => {
      setApartments(values.data.filterdApartments);
    };

    return (
      <Fragment>
        <FilterBar getValues={getValues} />
        <section>
          {apartments.map((p) => {
            return (
              <ApartmentCard
                key={p._id}
                id={p._id}
                type={p.type}
                price={p.price}
                isAvaliable={p.isAvaliable}
                location={p.location}
                space={p.space}
                rooms={p.rooms}
                description={p.description}
                rentOrSale={p.rentOrSale}
                bathrooms={p.bathrooms}
                photos={p.photos}
                paymentType={p.paymentType}
                deliveryDate={p.deliveryDate}
                spaceUnit={p.spaceUnit}
                refrenceName={p.refrenceName}
                mainHeader={p.mainHeader}
                finishing={p.finishing}
              />
            );
          })}
        </section>
      </Fragment>
    );
  } else {
    return <></>;
  }
}
export default SalePage;
