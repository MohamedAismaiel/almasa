import { useContext } from "react";
import { LoginContext } from "../context/loginContext";

function ApartmentRefrence() {
  const apartment = useContext(LoginContext).singleApartment;
  if (apartment.refrenceName) {
    let today = new Date().toUTCString();
    let daysOrMonthOrYear;
    let listedDate;
    today = new Date();
    let postDate = new Date(apartment.updatedAt);

    let day = 1000 * 60 * 60 * 24;
    let diff = Math.floor(today.getTime() - postDate.getTime());
    let days = Math.floor(diff / day);
    let months = Math.floor(days / 31);
    let years = Math.floor(months / 12);
    let hours = Math.round(Math.abs(postDate - today) / 36e5);
    let minutes = Math.floor((diff / day) * 24 * 60);
    if (years >= 1) {
      daysOrMonthOrYear = "years";
      listedDate = years;
    } else if (months <= 12 && months !== 0) {
      daysOrMonthOrYear = "months";
      listedDate = months;
    } else if (days === 0 && hours !== 0) {
      daysOrMonthOrYear = "hours";
      listedDate = hours;
    } else if (hours === 0) {
      daysOrMonthOrYear = "minutes";
      listedDate = minutes;
    } else {
      daysOrMonthOrYear = "days";
      listedDate = days;
    }

    return (
      <div className="refrenceArea">
        <div className="refrenceArea-refrence">
          <p>Refrence :</p>
          <span>{apartment.refrenceName}</span>
        </div>
        <div className="refrenceArea-listed">
          <p>Listed :</p>
          <span>
            {listedDate}&nbsp;
            {daysOrMonthOrYear} ago
          </span>
        </div>
      </div>
    );
  } else return <></>;
}

export default ApartmentRefrence;
