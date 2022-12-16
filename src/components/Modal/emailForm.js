import { useContext, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { LoginContext } from "../context/loginContext";
import { formatPrice } from "../UI/numberFormatter";
import EmailFormModal from "./emailModal";
import { BiBed, BiBath } from "react-icons/bi";
import { isPossiblePhoneNumber } from "react-phone-number-input";

function EmailForm() {
  const apartment = useContext(LoginContext).cardClickedApartment;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);
  const [emailMessage, setEmailMessage] = useState(
    `Hello, I am interested in this property with the reference code: (${apartment.refrenceName}) on Al-Masa website, kindly contact me. thanks`
  );
  const [enteredPhoneNumberIsTouched, setEnteredPhoneNumberIsTouched] =
    useState(false);

  let enteredPhoneNumberIsInvalid;
  let enteredPhoneNumberIsValid;

  if (phoneNumber === undefined) {
    enteredPhoneNumberIsInvalid = true;
  } else {
    enteredPhoneNumberIsValid = isPossiblePhoneNumber(phoneNumber);
    enteredPhoneNumberIsInvalid =
      enteredPhoneNumberIsTouched && !enteredPhoneNumberIsValid;
  }

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  const enteredEmailIsValid =
    enteredEmail.trim() !== "" && /\S+@\S+\.\S+/.test(enteredEmail);

  const emailInputIsinvalid = !enteredEmailIsValid && enteredEmailIsTouched;

  const nameCssClass = nameInputIsInvalid
    ? "emailForm-textarea-information-nameContainer-input invalid "
    : "emailForm-textarea-information-nameContainer-input ";
  const emailCssClass = emailInputIsinvalid
    ? "emailForm-textarea-information-emailContainer-input invalid "
    : "emailForm-textarea-information-emailContainer-input ";
  const phoneNumberCssClass = enteredPhoneNumberIsInvalid
    ? "phoneNumberInput invalid "
    : "phoneNumberInput ";

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setEnteredNameIsTouched(true);
    setEnteredEmailIsTouched(true);
    setEnteredPhoneNumberIsTouched(true);
    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPhoneNumberIsValid
    ) {
      return;
    }
    const graphqlQuery = {
      query: `mutation CreateEmailFormInfo($phoneNumber:String!,$name:String!,$email:String!,$message:String!)
      {
        CreateEmailFormInfo(customerMessage:
          { phoneNumber:$phoneNumber,name:$name,message:$message,email:$email }
        )
        {
          customerMessage
        }
      }

      `,
      variables: {
        phoneNumber: `${phoneNumber}`,
        name: `${enteredName}`,
        email: `${enteredEmail}`,
        message: `${emailMessage}`,
      },
    };
    await fetch("http://localhost:8080/graphql", {
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
        console.log(resData);
        if (resData.errors) {
          const error = new Error(`${resData.errors[0].data[0].message}`);
          throw error;
        }
        // if (!resData.data.emailFormInfo.phoneNumberIsValid) {
        //   setValidatedPhoneNumber(false);
        //   throw new Error("Phone Number Is Not Valid");
        // }
        // setValidatedPhoneNumber(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeForm = useContext(LoginContext).hideEmailForm;
  if (!apartment) {
    return <></>;
  }
  let price = formatPrice(apartment.price);

  return (
    <EmailFormModal>
      <form method="POST" onSubmit={submitFormHandler}>
        <h3 className="emailForm-title">Email Form</h3>
        <div className="emailForm-apartmentDetail">
          <img
            src={apartment.photos[0].location}
            alt="apartment"
            className="emailForm-apartmentDetail-image"
          />
          <div className="emailForm-apartmentDetail-paragraph">
            <h3 className="emailForm-apartmentDetail-paragraph-title">
              {apartment.mainHeader}
            </h3>
            <p className="emailForm-apartmentDetail-paragraph-price">{price}</p>

            <div className="emailForm-apartmentDetail-paragraph-rooms">
              <p className="emailForm-apartmentDetail-paragraph-rooms-bedrooms">
                {apartment.rooms}
                <span>
                  <BiBed size={18} />
                </span>
              </p>
              <p className="emailForm-apartmentDetail-paragraph-rooms-bathrooms">
                {apartment.bathrooms}
                <span>
                  <BiBath size={18} />
                </span>
              </p>
            </div>
            <p className="emailForm-apartmentDetail-paragraph-finishing">
              <span>Finishing: </span>
              {apartment.finishing}
            </p>
            <p className="emailForm-apartmentDetail-paragraph-deliveryDate">
              <span>Delivery date: </span>
              {apartment.deliveryDate}
            </p>
          </div>
        </div>
        <textarea
          className="emailForm-textarea-text"
          defaultValue={emailMessage}
          onChange={(e) => {
            setEmailMessage(e.target.value);
          }}
          required
        />
        <div className="emailForm-textarea-information">
          <div className="emailForm-textarea-information-nameContainer">
            <input
              id="name"
              className={nameCssClass}
              placeholder="Your name"
              type="text"
              onBlur={(e) => {
                setEnteredNameIsTouched(true);
              }}
              onChange={(e) => {
                setEnteredName(e.target.value);
              }}
              required
            />
            {nameInputIsInvalid && (
              <label
                className="emailForm-textarea-information-nameContainer-label "
                htmlFor="name"
              >
                Please enter your name
              </label>
            )}
          </div>
          <div className="emailForm-textarea-information-emailContainer">
            <input
              id="email"
              className={emailCssClass}
              placeholder="Your name"
              type="email"
              onChange={(e) => {
                setEnteredEmail(e.target.value);
              }}
              onBlur={(e) => {
                setEnteredEmailIsTouched(true);
              }}
              required
            />
            {emailInputIsinvalid && (
              <label
                className="emailForm-textarea-information-emailContainer-label "
                htmlFor="email"
              >
                Please enter a valid email
              </label>
            )}
          </div>
        </div>
        <div className="emailForm-textarea-information-phoneNumberContainer-label">
          <PhoneInput
            placeholder="enter your phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="EG"
            className={phoneNumberCssClass}
            international={true}
            onBlur={(e) => {
              setEnteredPhoneNumberIsTouched(true);
            }}
          />
          {enteredPhoneNumberIsInvalid && (
            <label
              className="emailForm-textarea-information-phoneNumberContainer-label "
              htmlFor="email"
            >
              Please enter a valid phone number
            </label>
          )}
        </div>
        <button type="submit" className="button button-send">
          Send
        </button>
        <p
          className="closeButton"
          onClick={(e) => {
            closeForm();
          }}
        >
          X
        </p>
      </form>
    </EmailFormModal>
  );
}
export default EmailForm;
