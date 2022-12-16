import { useContext, useState } from "react";
import { LoginContext } from "../context/loginContext";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

function ApartmentDescriptionDetails() {
  const apartment = useContext(LoginContext).singleApartment;

  const [readText, setReadText] = useState(false);
  let style;
  const readMoreHandler = () => {
    setReadText(!readText);
  };
  let listOfParagraphs = `${apartment.description}`.split("\n");

  if (readText) {
    style = {
      maxHeight: "max-content",
    };
  } else {
    style = {
      maxHeight: "5.5rem",
    };
  }
  return (
    <div className="detailsDescription">
      <h3 className="detailsDescription-title">Description</h3>
      <div className="detailsDescription-desc">
        <div className="detailsDescription-desc-text" style={style}>
          {listOfParagraphs.map((p, i) => {
            if (p.length === 0) {
              return <br key={Date.now() + Math.random()}></br>;
            } else return <p key={Date.now() + Math.random()}>{p}</p>;
          })}
        </div>
        <button
          className="detailsDescription-desc-button button"
          onClick={readMoreHandler}
        >
          {readText ? "Read Less" : "Read More"}
          {readText ? (
            <MdOutlineKeyboardArrowUp size={20} color="#ef5e4e" />
          ) : (
            <MdOutlineKeyboardArrowDown color="#ef5e4e" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

export default ApartmentDescriptionDetails;
