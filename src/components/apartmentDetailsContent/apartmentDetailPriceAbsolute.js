import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../context/loginContext";
import { formatPrice } from "../UI/numberFormatter";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoMdCall, IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { useLocation } from "react-router-dom";

function ApartmentPriceDetailsAbs(props) {
  const location = useLocation();
  const dailyOrMonthly = location.search.split("?")[1];
  const isItDaily = dailyOrMonthly === "daily";

  const apartment = useContext(LoginContext).singleApartment;
  const [showCurrency, setShowCurrency] = useState(false);

  const [likedApartment, setLikedApartment] = useState(false);
  const [price, setPrice] = useState(
    isItDaily
      ? formatPrice(apartment.dailyRentPrice)
      : formatPrice(apartment.price)
  );
  // const btnRef = useRef();
  const showEmailForm = useContext(LoginContext).showEmailForm;
  const setCardClickedApartment = useContext(LoginContext).setCardApartment;

  const [call, showNumber] = useState("Call");
  const [refrence, showRefrence] = useState(false);
  const [usdPrice, setUSDPrice] = useState(null);
  const [eurPrice, setEURPrice] = useState(null);
  const [gbpPrice, setGBPPrice] = useState(null);

  const apartmentPrice = isItDaily ? apartment.dailyRentPrice : apartment.price;
  let egpPrice = formatPrice(apartmentPrice);

  //   localStorage.setItem("likedApartments", JSON.stringify(["1", "2", "3"]));
  /////////Liking post/////////////////////////////////////
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("likedApartments"))) {
      return;
    }
    let likedApartments = JSON.parse(localStorage.getItem("likedApartments"));
    let likedApartmentId;
    likedApartmentId = likedApartments.filter((p) => p === apartment._id);
    if (likedApartmentId.length > 0) {
      setLikedApartment(true);
    } else setLikedApartment(false);
    if (likedApartments.length === 0) {
      localStorage.clear("likedApartments");
    }
  }, [setLikedApartment, likedApartment, apartment._id]);
  useEffect(() => {
    const graphqlQueryUSD = {
      query: ` query currencyChanger($from:String!,$to:String!,$amount:Int!) {
          currencyChanger(from:$from to:$to amount: $amount)
          {
            price
          }
        }`,
      variables: {
        from: "egp",
        to: "usd",
        amount: apartmentPrice,
      },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(graphqlQueryUSD),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setUSDPrice(resData.data.currencyChanger.price);
      });
    const graphqlQueryEUR = {
      query: ` query currencyChanger($from:String!,$to:String!,$amount:Int!) {
            currencyChanger(from:$from to:$to amount: $amount)
            {
              price
            }
          }`,
      variables: {
        from: "egp",
        to: "eur",
        amount: apartmentPrice,
      },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(graphqlQueryEUR),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setEURPrice(resData.data.currencyChanger.price);
      });
    const graphqlQueryGBP = {
      query: ` query currencyChanger($from:String!,$to:String!,$amount:Int!) {
              currencyChanger(from:$from to:$to amount: $amount)
              {
                price
              }
            }`,
      variables: {
        from: "egp",
        to: "gbp",
        amount: apartmentPrice,
      },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(graphqlQueryGBP),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setGBPPrice(resData.data.currencyChanger.price);
      });
  }, []);

  const saveApartment = (p, s) => {
    let likedApartments = JSON.parse(localStorage.getItem("likedApartments"));
    let likedApartmentId;

    if (likedApartments === null) {
      likedApartments = [];
    }
    likedApartmentId = likedApartments.filter((p) => p === apartment._id);
    if (likedApartmentId.length > 0) {
      likedApartments = likedApartments.filter((p) => p !== apartment._id);
      localStorage.setItem("likedApartments", JSON.stringify(likedApartments));
      setLikedApartment(false);
    } else {
      let updatedLikedApartment = [...likedApartments, apartment._id];
      localStorage.setItem(
        "likedApartments",
        JSON.stringify(updatedLikedApartment)
      );
      setLikedApartment(true);
    }
  };
  ////////////////////////////////////////////////////////

  const showCurrencyBox = (e) => {
    setShowCurrency((prev) => !prev);
  };
  const hideCurrencyDropDown = (e) => {
    if (e.target.dataset.curr !== "curr") {
      setShowCurrency(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", hideCurrencyDropDown);
    return () => document.removeEventListener("click", hideCurrencyDropDown);
  });
  if (apartment._id) {
    // const changeCurrency = (from, to, amount) => {
    //   if (to === "egp") {
    //     setPrice(formatPrice(apartment.price));
    //     return;
    //   }
    //   const graphqlQuery = {
    //     query: ` query currencyChanger($from:String!,$to:String!,$amount:Int!) {
    //       currencyChanger(from:$from to:$to amount: $amount)
    //       {
    //         price
    //       }
    //     }`,
    //     variables: {
    //       from,
    //       to,
    //       amount,
    //     },
    //   };
    //   fetch("http://localhost:8080/graphql", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(graphqlQuery),
    //   })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((resData) => {
    //       setPrice(formatPrice(resData.data.currencyChanger.price, to));
    //     });
    // };

    return (
      <div className="priceAreaAbs">
        <div className="priceAreaAbs-part1">
          <div className="priceAreaAbs-part1-pricebox">
            {dailyOrMonthly === "daily" ? <p>{price} / Day</p> : <p>{price}</p>}
            <button
              className="button button-changeCurrency"
              onClick={showCurrencyBox}
            >
              <span data-curr="curr">...</span>
              {showCurrency && (
                <ul className="currency">
                  <li
                    className="currency-item currency-item-egp"
                    onClick={(e) => {
                      // changeCurrency("egp", "egp", apartment.price);
                      setPrice(egpPrice);
                    }}
                  >
                    EGP
                  </li>
                  <li
                    className="currency-item currency-item-dollar"
                    onClick={(e) => {
                      setPrice(formatPrice(usdPrice, "usd"));
                    }}
                  >
                    USD
                  </li>
                  <li
                    className="currency-item currency-item-euro"
                    onClick={(e) => {
                      // changeCurrency("egp", "eur", apartment.price);
                      setPrice(formatPrice(eurPrice, "eur"));
                    }}
                  >
                    EUR
                  </li>
                  <li
                    className="currency-item currency-item-gbp"
                    onClick={(e) => {
                      // changeCurrency("egp", "gbp", apartment.price);
                      setPrice(formatPrice(gbpPrice, "gbp"));
                    }}
                  >
                    GBP
                  </li>
                </ul>
              )}
            </button>
          </div>
          <div className="priceAreaAbs-part1-buttons">
            <button
              className="button button-call button-call-detailed"
              onClick={(e) => {
                e.preventDefault();
                showNumber("0123456789");
                showRefrence(!refrence);
              }}
            >
              <IoMdCall size={16} />
              <span>{call}</span>
            </button>
            <button
              className="button button-email button-email-detailed"
              onClick={(e) => {
                e.preventDefault();
                setCardClickedApartment(apartment);
                showEmailForm();
              }}
            >
              <IoMdMail size={16} />
              <span>Email</span>
            </button>

            <a
              href="https://wa.me/+201063862535"
              target="_blank"
              rel="noreferrer"
              className="button button-whatsapp button-whatsapp-detailed"
            >
              <IoLogoWhatsapp size={16} />
              <span>WhatsApp</span>
            </a>
          </div>{" "}
          {refrence && (
            <div className=" priceAreaAbs-part1-buttons-refrenceAreaAbs">
              <p className=" priceAreaAbs-part1-buttons-refrenceAreaAbs-mention">
                Mention the refrence
              </p>
              <p className=" priceAreaAbs-part1-buttons-refrenceAreaAbs-refrence">
                "El Masa {apartment.refrenceName}"
              </p>
              <span
                className=" priceAreaAbs-part1-buttons-refrenceAreaAbs-x"
                onClick={(e) => {
                  showRefrence(false);
                }}
              >
                X
              </span>
            </div>
          )}
        </div>
        <div className="priceAreaAbs-part2" onClick={saveApartment}>
          {likedApartment ? (
            <AiFillHeart size={16} color="red" />
          ) : (
            <AiOutlineHeart size={16} />
          )}
          <span>Save to shortlist</span>
        </div>
      </div>
    );
  }
  return <></>;
}

export default ApartmentPriceDetailsAbs;
