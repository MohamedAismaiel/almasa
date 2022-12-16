import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../context/loginContext";
import { formatPrice } from "../UI/numberFormatter";
import { RiPhoneFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
function ApartmentPriceDetails() {
  const [showCurrency, setShowCurrency] = useState(false);
  const [currency, setCurrency] = useState("EGP");
  const apartment = useContext(LoginContext).singleApartment;
  const btnRef = useRef();
  const showCurrencyBox = () => {
    setShowCurrency((prev) => !prev);
  };
  const hideCurrencyDropDown = (e) => {
    if (e.path[0] !== btnRef.current) {
      setShowCurrency(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", hideCurrencyDropDown);
    return () => document.removeEventListener("click", hideCurrencyDropDown);
  });
  if (apartment._id) {
    let price = formatPrice(apartment.price, currency);

    return (
      <div className="priceArea">
        <div className="priceArea-part1">
          <div className="priceArea-part1-pricebox">
            <p>{price}</p>
            <button
              className="button button-changeCurrency"
              onClick={showCurrencyBox}
            >
              <span ref={btnRef}>...</span>
              {showCurrency && (
                <ul className="currency">
                  <li
                    className="currency-item currency-item-egp"
                    onClick={(e) => {
                      setCurrency(e.target.textContent);
                    }}
                  >
                    EGP
                  </li>
                  <li
                    className="currency-item currency-item-dollar"
                    onClick={(e) => {
                      setCurrency(e.target.textContent);
                    }}
                  >
                    USD
                  </li>
                  <li
                    className="currency-item currency-item-euro"
                    onClick={(e) => {
                      setCurrency(e.target.textContent);
                    }}
                  >
                    EUR
                  </li>
                  <li
                    className="currency-item currency-item-gbp"
                    onClick={(e) => {
                      setCurrency(e.target.textContent);
                    }}
                  >
                    GBP
                  </li>
                </ul>
              )}
            </button>
          </div>
          <div className="priceArea-part1-buttons">
            <button className="button button-call button-call-detailed">
              <RiPhoneFill size={16} />
              <span>Call</span>
            </button>
            <button className="button button-email button-email-detailed">
              <MdEmail size={16} />
              <span>Email</span>
            </button>
            <a
              href="https://wa.me/+201063862535"
              target="_blank"
              rel="noreferrer"
              className="button button-whatsapp button-whatsapp-detailed"
            >
              <BsWhatsapp size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
  return <></>;
}

export default ApartmentPriceDetails;
