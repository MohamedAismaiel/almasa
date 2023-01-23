import { useContext, useState } from "react";
import LoginProvider, { LoginContext } from "../context/loginContext";
import Button from "../UI/button";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
function CreateAppartmentForm(props) {
  const [enteredType, setEnteredType] = useState("apartment");
  const [enteredRentOrSale, setEnteredRentOrSale] = useState("rent");
  const [enteredIsAvaliable, setEnteredIsAvaliable] = useState("yes");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredLocation, setEnteredLocation] = useState({});
  const [enteredSpace, setEnteredSpace] = useState("");
  const [spaceUnit, setSpaceUnit] = useState(`sqm`);
  const [enteredRooms, setEnteredRooms] = useState("");
  const [enteredBathrooms, setEnteredBathrooms] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredFinishing, setEnteredFinishing] = useState("unfinished");
  const [paymentType, setPaymentType] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [mainHeader, setMainHeader] = useState("");
  const [image, setImage] = useState();
  const [furnishedValue, setFurnishedValue] = useState("furnished");
  const [refrenceName, setRefrenceName] = useState("");
  const [viewValue, setViewValue] = useState("garden view");
  const furnished = useContext(LoginContext).furnishedAmentites;
  const viewAmentites = useContext(LoginContext).viewAmentites;
  const [amenities, setList] = useState([]);
  // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const amenitie = useContext(LoginContext).amenitie;
  const logout = useContext(LoginContext).logoutHandler;
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
    if (!localStorage.getItem("token")) {
      logout();
      const error = new Error("Not Authenticated");
      throw error;
    }

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
  function onPlaceSelect(value) {
    let updatedAdress;
    let location;

    value.properties.datasource.raw["name:en"] === undefined
      ? (updatedAdress = value.properties.address_line1)
      : (updatedAdress = value.properties.datasource.raw["name:en"]);

    value.properties.name_international.ar === undefined
      ? (location = {
          address: updatedAdress,
          city: value.properties.state,
          country: value.properties.country,
          lat: value.properties.lat,
          lon: value.properties.lon,
          fullyFormated: value.properties.formatted,
        })
      : (location = {
          address: updatedAdress,
          city: value.properties.state,
          country: value.properties.country,
          ArName: value.properties.name_international.ar,
          lat: value.properties.lat,
          lon: value.properties.lon,
          fullyFormated: value.properties.formatted,
        });
    setEnteredLocation(location);
  }

  function onSuggectionChange(value) {
    console.log(value);
  }
  function suggestionsFilter(suggestions) {
    const processedStreets = [];

    const filtered = suggestions.filter((value) => {
      if (
        /[\u0600-\u06FF]/.test(value.properties.address_line1) ||
        value.properties.datasource.sourcename === "whosonfirst"
      ) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    });

    return filtered;
  }

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
      <GeoapifyContext apiKey="d58fcb81a23e4d69b4496ae7bcb6f54e">
        <label>location</label>
        <GeoapifyGeocoderAutocomplete
          placeholder="Enter address here"
          limit={5}
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
          skipSelectionOnArrowKey={true}
          suggestionsFilter={suggestionsFilter}
          filterByCountryCode={["eg", "ae"]}
        />
      </GeoapifyContext>

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
            setEnteredFinishing(e.target.value);
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
        id="styling"
        name={furnishedValue}
        value={furnishedValue}
        onChange={(e) => {
          if (e.target.checked) {
            if (e.target.checked) {
              setList((oldList) => {
                return [...oldList, viewValue];
              });
            } else {
              const name = e.target.getAttribute("name");
              setList(amenities.filter((item) => item !== name));
            }
          }
        }}
      />
      <label htmlFor="furniture">
        Furnishing style
        <select
          id="styling"
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
        name={viewValue}
        value={viewValue}
        onChange={(e) => {
          if (e.target.checked) {
            setList((oldList) => {
              return [...oldList, viewValue];
            });
          } else {
            const name = e.target.getAttribute("name");
            setList(amenities.filter((item) => item !== name));
          }
        }}
      />
      <label htmlFor="view">
        apartment view
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
                  setList((oldList) => {
                    console.log(oldList);
                    return [...oldList, p];
                  });
                } else {
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
