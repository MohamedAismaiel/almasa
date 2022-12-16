import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { formatPrice } from "../UI/numberFormatter";
import { BiBed } from "react-icons/bi";
import { BiBath } from "react-icons/bi";
import { IoMdCall, IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { LoginContext } from "../context/loginContext";
function ApartmentCard(props) {
  const setCardClickedApartment = useContext(LoginContext).setCardApartment;
  const showEmailForm = useContext(LoginContext).showEmailForm;
  const [likedApartment, setLikedApartment] = useState(false);
  const [call, showNumber] = useState("Call");
  const [refrence, showRefrence] = useState(false);
  let locationEdited =
    props.location.split(",").slice(0, 1) + props.location.split(",").slice(-1);

  if (props.location.split(",").length <= 1) {
    locationEdited = props.location;
  }

  const [appear, setAppear] = useState(1);

  let price = formatPrice(props.price);

  const nextSlider = () => {
    setAppear((prev) => {
      if (props.photos.length <= prev) {
        return 1;
      }
      return prev + 1;
    });
  };
  const prevSlider = () => {
    setAppear((prev) => {
      if (prev === 1) {
        return props.photos.length;
      }
      return prev - 1;
    });
  };
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("likedApartments"))) {
      return;
    }
    let likedApartments = JSON.parse(localStorage.getItem("likedApartments"));
    let likedApartmentId;
    likedApartmentId = likedApartments.filter((p) => p === props.id);
    if (likedApartmentId.length > 0) {
      setLikedApartment(true);
    } else setLikedApartment(false);
    if (likedApartments.length === 0) {
      localStorage.clear("likedApartments");
    }
  }, [setLikedApartment, likedApartment, props.id]);
  const saveApartment = (p, s) => {
    let likedApartments = JSON.parse(localStorage.getItem("likedApartments"));
    let likedApartmentId;

    if (likedApartments === null) {
      likedApartments = [];
    }
    likedApartmentId = likedApartments.filter((p) => p === props.id);
    if (likedApartmentId.length > 0) {
      likedApartments = likedApartments.filter((p) => p !== props.id);
      localStorage.setItem("likedApartments", JSON.stringify(likedApartments));
      setLikedApartment(false);
    } else {
      let updatedLikedApartment = [...likedApartments, props.id];
      localStorage.setItem(
        "likedApartments",
        JSON.stringify(updatedLikedApartment)
      );
      setLikedApartment(true);
    }
  };

  return (
    <main className="apartment-cards">
      <div className="card" onClick={(e) => {}}>
        <div className="cardImageBox" id="imageSection">
          {props.photos.map((p, i) => {
            let style;
            let classImageName = `cardImageBox-image image--${i + 1}`;
            style = {
              // left: 0,
              transform: `translateX(${1400 * (i + 1 - appear)}%)`,
            };
            if (i + 1 === appear) {
              style = {
                // left: 0,
                transform: "translateX(0%)",
              };
            }
            return (
              <LazyLoadImage
                key={p.id}
                alt="apartment"
                src={p.location}
                className={classImageName}
                height="100%"
                width="30%"
                style={style}
                onClick={() => {}}
              ></LazyLoadImage>
            );
          })}
        </div>
        {refrence && (
          <div className="refrenceBox">
            <p className="refrenceBox-mention">Mention the refrence</p>
            <p className="refrenceBox-refrence">
              "El Masa {props.refrenceName}"
            </p>
            <span
              className="refrenceBox-x"
              onClick={(e) => {
                showRefrence(false);
              }}
            >
              X
            </span>
          </div>
        )}
        <Link
          target="_blank"
          rel="noreferrer noopener"
          onClick={(e) => {
            if (e.target.dataset.name !== "call") {
              showRefrence(false);
            }
          }}
          to={`/${props.rentOrSale.replace(" ", "-")}/${props.id}`}
        >
          <div className="card-detailsbox">
            <p className="card-detailsbox-price">{price}</p>
            <p className="card-detailsbox-paymentType">{props.paymentType}</p>
            <p className="card-detailsbox-brief">{`${props.type} for ${props.rentOrSale} in ${locationEdited}`}</p>
            <p className="card-detailsbox-space">
              {`${props.type}`}&nbsp;||&nbsp;{`${props.rooms}`}&nbsp;
              <BiBed size={18} />
              &nbsp;||&nbsp;{`${props.bathrooms}`}&nbsp;
              <BiBath size={18} />
              &nbsp;|| {`${props.space}`}
              &nbsp; {props.spaceUnit}
            </p>

            <p className="card-detailsbox-location">
              <IoLocationSharp size={16} />
              {props.location}
            </p>
            <p className="card-detailsbox-deliveryDate">
              Delivery date: <span>{props.deliveryDate}</span>
            </p>
            <div className="card-detailsbox-contact">
              <button
                data-name="call"
                className="button button-call"
                onClick={(e) => {
                  e.preventDefault();
                  showNumber("0123456789");
                  showRefrence(!refrence);
                }}
              >
                <IoMdCall data-name="call" size={20} color="#3b97ba" />
                <span data-name="call">{call}</span>
              </button>
              <button
                className="button button-email"
                onClick={(e) => {
                  e.preventDefault();
                  setCardClickedApartment(props);
                  showEmailForm();
                }}
              >
                <IoMdMail size={20} color="#3b97ba" />
                <span>E-mail</span>
              </button>
              <button
                className="button button-whatsapp"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://wa.me/+201063862535",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <IoLogoWhatsapp size={20} color="#3b97ba" />
                <span>WhatsApp</span>
              </button>
              <button
                className="button button-fav"
                onClick={(e) => {
                  e.preventDefault();
                  saveApartment();
                }}
              >
                {likedApartment ? (
                  <AiFillHeart size={16} color="red" />
                ) : (
                  <AiOutlineHeart size={16} />
                )}
              </button>
            </div>
          </div>
        </Link>
        <button className="slider__btn slider__btn--left" onClick={prevSlider}>
          &larr;
        </button>
        <button className="slider__btn slider__btn--right" onClick={nextSlider}>
          &rarr;
        </button>
      </div>
    </main>
  );
}
export default ApartmentCard;

// price
// type for rentorsale in location
// type rooms bathrooms space
// location
// contact details
