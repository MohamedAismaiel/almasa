import { Fragment, useContext, useEffect, useState } from "react";
// import { LoginContext } from "../components/context/loginContext";
import ApartmentCard from "../components/apartmentCard/apartmentCard";
import FilterBar from "../components/filter bar/filterBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { LoginContext } from "../components/context/loginContext";

function RentPage() {
  // const isAuth = useContext(LoginContext).isAuth;
  // const token = useContext(LoginContext).token;
  const apartmentsCtx = useContext(LoginContext).apartments;
  const initialFetching = useContext(LoginContext).initialFetching;

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  // const [apartments, setApartments] = useState(null);
  const dailyOrMonthly =
    searchParams.get("dOrM") === null ? "monthly" : searchParams.get("dOrM");
  const setApartmentsCtx = useContext(LoginContext).setApartmentsHandler;
  useEffect(() => {
    const controller = new AbortController();
    const apartmentType = JSON.stringify(searchParams.get("type"));
    const bedroomsNumbers =
      searchParams.get("beds") === "all" || searchParams.get("beds") === null
        ? JSON.stringify([])
        : searchParams.get("beds");
    const bathroomsNumbers =
      searchParams.get("baths") === "all" || searchParams.get("baths") === null
        ? JSON.stringify([])
        : searchParams.get("baths");
    const minPrice = searchParams.get("minP");
    const maxPrice = searchParams.get("maxP");
    const rentType = JSON.stringify(location.pathname.split("/")[1]);
    initialFetching(
      rentType,
      apartmentType,
      bedroomsNumbers,
      bathroomsNumbers,
      minPrice,
      maxPrice,
      dailyOrMonthly
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [searchParams.get("bor")]);

  if (apartmentsCtx != null && apartmentsCtx.length > 0) {
    if (apartmentsCtx[0].rentOrSale !== "rent") {
      return <></>;
    }
    // const getValues = (values) => {
    //   // setApartments(values.data.filterdApartments);
    //   setApartments(values.data.filterdApartments);
    // };
    return (
      <Fragment>
        {/* <FilterBar getValues={getValues} /> */}
        <section>
          {apartmentsCtx.map((p) => {
            let price =
              dailyOrMonthly === "monthly" ? p.price : p.dailyRentPrice;
            return (
              <ApartmentCard
                key={p._id}
                id={p._id}
                type={p.type}
                price={price}
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
                dayliRentPrice={p.dailyRentPrice}
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
export default RentPage;
// import { Fragment, useContext, useEffect, useState } from "react";
// // import { LoginContext } from "../components/context/loginContext";
// import ApartmentCard from "../components/apartmentCard/apartmentCard";
// import FilterBar from "../components/filter bar/filterBar";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { LoginContext } from "../components/context/loginContext";

// function RentPage() {
//   // const isAuth = useContext(LoginContext).isAuth;
//   // const token = useContext(LoginContext).token;
//   // const apartments = useContext(LoginContext).apartments;

//   const [searchParams, setSearchParams] = useSearchParams();
//   const location = useLocation();
//   // const [apartments, setApartments] = useState(null);
//   const dailyOrMonthly =
//     searchParams.get("dOrM") === null ? "monthly" : searchParams.get("dOrM");
//   const apartmentsCtx = useContext(LoginContext).apartments;
//   const setApartmentsCtx = useContext(LoginContext).setApartmentsHandler;
//   const initialFetching = useContext(LoginContext).initialFetching;

//   useEffect(() => {
//     const controller = new AbortController();
//     const apartmentType = JSON.stringify(searchParams.get("type"));
//     const bedroomsNumbers =
//       searchParams.get("beds") === "all" || searchParams.get("beds") === null
//         ? JSON.stringify([])
//         : searchParams.get("beds");
//     const bathroomsNumbers =
//       searchParams.get("baths") === "all" || searchParams.get("baths") === null
//         ? JSON.stringify([])
//         : searchParams.get("baths");
//     const minPrice = searchParams.get("minP");
//     const maxPrice = searchParams.get("maxP");
//     const rentType = JSON.stringify(location.pathname.split("/")[1]);
//     initialFetching(
//       rentType,
//       apartmentType,
//       bedroomsNumbers,
//       bathroomsNumbers,
//       minPrice,
//       maxPrice,
//       dailyOrMonthly
//     );

//     return () => {
//       controller.abort();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (apartmentsCtx != null) {
//     const getValues = (values) => {
//       setApartmentsCtx(values.data.filterdApartments);
//     };

//     return (
//       <Fragment>
//         <FilterBar getValues={getValues} />
//         <section>
//           {apartmentsCtx.map((p) => {
//             let price =
//               dailyOrMonthly === "monthly" ? p.price : p.dailyRentPrice;
//             return (
//               <ApartmentCard
//                 key={p._id}
//                 id={p._id}
//                 type={p.type}
//                 price={price}
//                 isAvaliable={p.isAvaliable}
//                 location={p.location}
//                 space={p.space}
//                 rooms={p.rooms}
//                 description={p.description}
//                 rentOrSale={p.rentOrSale}
//                 bathrooms={p.bathrooms}
//                 photos={p.photos}
//                 paymentType={p.paymentType}
//                 deliveryDate={p.deliveryDate}
//                 spaceUnit={p.spaceUnit}
//                 refrenceName={p.refrenceName}
//                 mainHeader={p.mainHeader}
//                 finishing={p.finishing}
//                 dayliRentPrice={p.dailyRentPrice}
//               />
//             );
//           })}
//         </section>
//       </Fragment>
//     );
//   } else {
//     return <></>;
//   }
// }
// export default RentPage;
