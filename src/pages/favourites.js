import { useEffect, useState } from "react";

import ApartmentCard from "../components/apartmentCard/apartmentCard";

function FavouritesPage() {
  const [apartments, setApartments] = useState();
  const likedApartmentsId = localStorage.getItem("likedApartments");
  useEffect(() => {
    if (!likedApartmentsId) {
      return;
    }

    const abort = new AbortController();
    const graphqlQuery = {
      query: `query favouriteAppartments($id:String!) 
          {
            favouriteAppartments(id:$id)
            
            { _id
              type
              rentOrSale
              price
              location {
                city
                country
                address
              }
              space
              rooms
              description
              bathrooms
              photos {
                location
                isLanding
                id
              }
              deliveryDate
              spaceUnit
              mainHeader
              createdAt
              updatedAt}
          } `,
      variables: { id: likedApartmentsId },
    };

    fetch("http://localhost:8080/graphql", {
      signal: abort.signal, // for the cleanup
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
        setApartments(resData.data.favouriteAppartments);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // console.log("fetch aborted");
        } else {
          // we use this in case we set an error to usestate
          // console.log(err);
        }
      });
    return () => abort.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const isAuth = useContext(LoginContext).isAuth;
  // const token = useContext(LoginContext).token;

  if (apartments) {
    return (
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
    );
  } else return <></>;
}
export default FavouritesPage;
