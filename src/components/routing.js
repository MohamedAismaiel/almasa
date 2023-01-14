import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CommericalSalePage from "../pages/commercialSalePage";
import CommericalRentPage from "../pages/CommericalRentPage";
import FavouritesPage from "../pages/favourites";
import HomePage from "../pages/homePage";
import RentPage from "../pages/rentPage";
import { LoginContext } from "./context/loginContext";

const ApartmentDetail = React.lazy(() => import("../pages/apartmentDetail"));
const SalePage = React.lazy(() => import("../pages/salePage"));
const CreateAppartment = React.lazy(() => import("../pages/createApartment"));
const Login = React.lazy(() => import("../pages/login"));
const Signup = React.lazy(() => import("../pages/signup"));
const Home = React.lazy(() => import("../pages/homePage"));
function Routing() {
  let isAuth = useContext(LoginContext).isAuth;
  // let isAuth;
  // if (localStorage.getItem("token")) {
  //   isAuth = true;
  // }

  return (
    <React.Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<Home />} />

        {isAuth ? (
          <Route path="/login" element={<Navigate to="/" />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/signup" element={<Signup />} />

        {isAuth ? (
          <Route path="/create-apartment" element={<CreateAppartment />} />
        ) : (
          <Route path="/create-apartment" element={<Navigate to="/login" />} />
        )}
        <Route path="/sale" element={<SalePage />} />

        <Route path="/sale/:apartmentId" element={<ApartmentDetail />} />

        <Route path="/rent" element={<RentPage />} />

        <Route path="/rent/:apartmentId" element={<ApartmentDetail />} />

        <Route path="/commercial-sale" element={<CommericalSalePage />} />

        <Route
          path="/commercial-sale/:apartmentId"
          element={<ApartmentDetail />}
        />

        <Route path="/commercial-rent" element={<CommericalRentPage />} />

        <Route
          path="/commercial-rent/:apartmentId"
          element={<ApartmentDetail />}
        />

        <Route path="/favourites" element={<FavouritesPage />} />

        <Route path="/favourites/:apartmentId" element={<ApartmentDetail />} />
      </Routes>
    </React.Suspense>
  );
}
export default Routing;

// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import CommericalSalePage from "../pages/commercialSalePage";
// import CommericalRentPage from "../pages/CommericalRentPage";
// import FavouritesPage from "../pages/favourites";
// import HomePage from "../pages/homePage";
// import RentPage from "../pages/rentPage";
// import { LoginContext } from "./context/loginContext";

// const ApartmentDetail = React.lazy(() => import("../pages/apartmentDetail"));
// const SalePage = React.lazy(() => import("../pages/salePage"));
// const CreateAppartment = React.lazy(() => import("../pages/createApartment"));
// const Login = React.lazy(() => import("../pages/login"));
// const Signup = React.lazy(() => import("../pages/signup"));
// const Home = React.lazy(() => import("../pages/homePage"));
// function Routing() {
//   const isAuth = useContext(LoginContext).isAuth;

//   return (
//     <React.Suspense fallback="loading">
//       <Routes>
//         <Route path="/" exact>
//           <Home />
//         </Route>
//         {isAuth ? (
//           <Route path="/login">
//             <Navigate to="/" />
//           </Route>
//         ) : (
//           <Route path="/login">
//             <Login />
//           </Route>
//         )}
//         <Route path="/signup">
//           <Signup />
//         </Route>
//         {isAuth ? (
//           <Route path="/create-apartment" exact>
//             <CreateAppartment />
//           </Route>
//         ) : (
//           <Route path="/create-apartment" exact>
//             <Navigate to="/login" />
//           </Route>
//         )}
//         <Route path="/sale" exact>
//           <SalePage />
//         </Route>
//         <Route path="/sale/:apartmentId">
//           <ApartmentDetail />
//         </Route>
//         <Route path="/rent" exact>
//           <RentPage />
//         </Route>
//         <Route path="/rent/:apartmentId">
//           <ApartmentDetail />
//         </Route>
//         <Route path="/commercial-sale" exact>
//           <CommericalSalePage />
//         </Route>
//         <Route path="/commercial-sale/:apartmentId">
//           <ApartmentDetail />
//         </Route>
//         <Route path="/commercial-rent" exact>
//           <CommericalRentPage />
//         </Route>
//         <Route path="/commercial-rent/:apartmentId">
//           <ApartmentDetail />
//         </Route>
//         <Route path="/favourites" exact>
//           <FavouritesPage />
//         </Route>
//         <Route path="/favourites/:apartmentId">
//           <ApartmentDetail />
//         </Route>
//       </Routes>
//     </React.Suspense>
//   );
// }
// export default Routing;
