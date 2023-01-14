import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function ApartmentLocation() {
  const apartment = useContext(LoginContext).singleApartment;
  const showMapctx = useContext(LoginContext).showMap;
  if (apartment._id) {
    return (
      <div className="detailsLocation">
        {/* <MapContainer
          center={[apartment.location[0].lat, apartment.location[0].lon]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
          />
          <Marker
            position={[apartment.location[0].lat, apartment.location[0].lon]}
          >
           <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> 
          </Marker>
       </MapContainer> */}
        <h3 className="detailsLocation-title">Location</h3>
        <div className="detailsLocation-map">
          <div className="detailsLocation-map-circle">
            <button
              onClick={(e) => {
                // window.open(
                //   "https://maps.google.com?q=" +
                //     apartment.location[0].lat +
                //     "," +
                //     apartment.location[0].lon
                // );
                showMapctx();
              }}
            >
              Map
            </button>
          </div>
          <div className="detailsLocation-map-text">
            <p>
              {apartment.location[0].address}, {apartment.location[0].city},{" "}
              {apartment.location[0].country}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

export default ApartmentLocation;
