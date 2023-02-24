import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import FilterBar from "../filter bar/filterBar";

const FilterLayout = () => {
  const setApartmentsCtx = useContext(LoginContext).setApartmentsHandler;

  const getValues = (values) => {
    // setApartments(values.data.filterdApartments);
    setApartmentsCtx(values.data.filterdApartments);
  };
  return (
    <>
      <FilterBar getValues={getValues} />
      <Outlet />
    </>
  );
};

export default FilterLayout;
