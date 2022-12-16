import { useContext, useState } from "react";
import { LoginContext } from "../context/loginContext";
import Button from "../UI/button";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function CreateAppartmentForm(props) {
  const [enteredType, setEnteredType] = useState("apartment");
  const [enteredRentOrSale, setEnteredRentOrSale] = useState("rent");
  const [enteredIsAvaliable, setEnteredIsAvaliable] = useState("yes");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredSpace, setEnteredSpace] = useState("");
  const [spaceUnit, setSpaceUnit] = useState(`sqm`);
  const [enteredRooms, setEnteredRooms] = useState("");
  const [enteredBathrooms, setEnteredBathrooms] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredFinishing, setEnteredUFinishing] = useState("unfinished");
  const [paymentType, setPaymentType] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [mainHeader, setMainHeader] = useState("");
  const [image, setImage] = useState();
  const [furnishedValue, setFurnishedValue] = useState("furnished");
  const [refrenceName, setRefrenceName] = useState("");
  const [viewValue, setViewValue] = useState("furnished");
  const furnished = useContext(LoginContext).furnishedAmentites;
  const viewAmentites = useContext(LoginContext).viewAmentites;
  const [amenities, setList] = useState([]);
  // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const amenitie = useContext(LoginContext).amenitie;
  // const id = [
  //   Date.now() + Math.random(),
  //   Date.now() + Math.random(),
  //   Date.now() + Math.random(),
  // ];

  //USE GETMEMO TO FIX RENDERING

  const ImageInputChangeHandler = (e) => {
    const file = e.target.files;
    // if (file && file.type.substr(0, 5) === "image") {
    //   setImage(file);
    // } else {
    //   setImage(null);
    // }
    setImage(file);
  };

  const onSubmitHandler = (e) => {
    props.createPostHandler(e, {
      enteredType,
      enteredRentOrSale,
      enteredIsAvaliable,
      enteredPrice,
      enteredLocation,
      enteredSpace,
      enteredRooms,
      enteredBathrooms,
      enteredDescription,
      enteredFinishing,
      image,
      paymentType,
      deliveryDate,
      mainHeader,
      spaceUnit,
      refrenceName,
      amenities,
      // coordinates,
    });

    // setEnteredEmail("");
    // setEnteredUsername("");
  };
  // const [address, setAddress] = useState("");

  // const handleSelect = async (value) => {
  //   const results = await geocodeByAddress(value);
  //   const latlng = await getLatLng(results[0]);

  //   setEnteredLocation(value);
  //   setCoordinates(latlng);
  // };

  return (
    <form
      method="post"
      encType="multipart/form-data"
      onSubmit={onSubmitHandler}
    >
      {/* <PlacesAutocomplete
        value={enteredLocation}
        onChange={setEnteredLocation}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Langitude: {coordinates.lng}</p>
            <label>location</label>
            <input {...getInputProps({ placeholder: "type address" })} />
            <div>
              {loading ? <div>loading...</div> : null}
              {suggestions.map((suggestion, i) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    key={i}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
      <label>location</label>
      <input
        type="text"
        onChange={(e) => {
          setEnteredLocation(e.target.value);
        }}
      />

      <div>
        <label htmlFor="type">Choose apartment type</label>
        <select
          id="type"
          onChange={(e) => {
            setEnteredType(e.target.value);
          }}
        >
          <option value="apartment">Apartment</option>
          <option value="studio">Studio</option>
          <option value="compound">Compound</option>
          <option value="villa">Villa</option>
          <option value="chalet">Chalet</option>
          <option value="duplex">Duplex</option>
          <option value="half floor">Half Floor</option>
          <option value="full floor">Full Floor</option>
          <option value="whole building">Whole building</option>
          <option value="land">Land</option>
          <option value="warehouse">Warehouse</option>
          <option value="shop">Shop</option>
          <option value="medical facility">Medical Facility</option>
          <option value="staff accommodation">Staff Accommodation</option>
          <option value="show room">Show room</option>
          <option value="office">Office</option>
        </select>
        <label htmlFor="rentOrSale">Apartment For </label>
        <select
          id="rentOrSale"
          onChange={(e) => {
            setEnteredRentOrSale(e.target.value);
          }}
        >
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
          <option value="commercial rent">Commercial rent</option>
          <option value="commercial sale">Commercial sale</option>
        </select>
        <label htmlFor="isAvaliable">Is avaliable</label>
        <select
          id="isAvaliable"
          onChange={(e) => {
            setEnteredIsAvaliable(e.target.value);
          }}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>price</label>
        <input
          type="number"
          onChange={(e) => {
            setEnteredPrice(e.target.value);
          }}
        />

        <label>Payment type</label>
        <input
          type="text"
          onChange={(e) => {
            setPaymentType(e.target.value);
          }}
        />

        <label htmlFor="space">Space:</label>
        <input
          type="number"
          onChange={(e) => {
            setEnteredSpace(e.target.value);
          }}
        />
        <select
          id="space"
          onChange={(e) => {
            setSpaceUnit(e.target.value);
          }}
        >
          <option value="sqm">sqm</option>
          <option value="sqft">sqft</option>
          <option value="arce">arce</option>
        </select>

        <label>space in </label>

        <label>rooms</label>
        <input
          type="number"
          onChange={(e) => {
            setEnteredRooms(e.target.value);
          }}
        />

        <label>bathrooms</label>
        <input
          type="number"
          onChange={(e) => {
            setEnteredBathrooms(e.target.value);
          }}
        />

        <label>Delivery date</label>
        <input
          type="text"
          onChange={(e) => {
            setDeliveryDate(e.target.value);
          }}
        />

        <label>Main Header</label>
        <input
          type="text"
          onChange={(e) => {
            setMainHeader(e.target.value);
          }}
        />
        <label htmlFor="description">description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          onChange={(e) => {
            setEnteredDescription(e.target.value);
          }}
        />

        <label htmlFor="finishing">Choose finishing type</label>
        <select
          id="finishing"
          onChange={(e) => {
            setEnteredUFinishing(e.target.value);
          }}
        >
          <option value="unfinished">Unfinished</option>
          <option value="semi-finished">Semi-finished</option>
          <option value="fully-finished">Fully-finished</option>
          <option value="lux">Lux</option>
          <option value="super lux">Super lux</option>
          <option value="ultra lux">Ultra lux</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>
      <label>Refrence name</label>
      <input
        type="text"
        onChange={(e) => {
          setRefrenceName(e.target.value);
        }}
      />
      <input
        multiple
        type="file"
        accept="image/*"
        onChange={ImageInputChangeHandler}
      />
      {/* Amenities */}
      <h3>Amenities</h3>
      <br />
      <input
        type="checkbox"
        id="furniture"
        name="furniture"
        value={furnishedValue}
        onChange={(e) => {}}
      />
      <label htmlFor="furniture">
        Furnishing style
        <select
          id="view"
          onChange={(e) => {
            setFurnishedValue(e.target.value);
          }}
        >
          {furnished.map((p, i) => {
            return (
              <option key={i} value={p}>
                {p}
              </option>
            );
          })}
        </select>
      </label>
      <input
        type="checkbox"
        id="view"
        name="view"
        value={viewValue}
        onChange={(e) => {}}
      />
      <label htmlFor="view">
        Furnishing style
        <select
          id="view"
          onChange={(e) => {
            setViewValue(e.target.value);
          }}
        >
          {viewAmentites.map((p, i) => {
            return (
              <option key={i} value={p}>
                {p}
              </option>
            );
          })}
        </select>
      </label>
      {/* <AmenitiessMemo  /> */}
      {amenitie.map((p, i) => {
        return (
          <div key={i}>
            <input
              type="checkbox"
              id={p}
              name={p}
              value={p}
              onChange={(e) => {
                if (e.target.checked) {
                  setList((oldList) => [...oldList, p]);
                  // amenities.push(e.target.value);
                } else {
                  // amenities = amenities.filter(
                  //   (word) => word !== e.target.value
                  // );
                  const name = e.target.getAttribute("name");
                  setList(amenities.filter((item) => item !== name));
                }
              }}
            />
            <label key={Date.now() * Math.random() * i} htmlFor={p}>
              {p}
            </label>
          </div>
        );
      })}

      <br />
      <Button type="submit">Create apartment</Button>
    </form>
  );
}
export default CreateAppartmentForm;
