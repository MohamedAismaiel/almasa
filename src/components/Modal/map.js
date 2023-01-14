import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LoginContext } from "../context/loginContext";
import MapModal from "./mapOverlay";
function Map() {
  const apartment = useContext(LoginContext).singleApartment;
  const closeMapctx = useContext(LoginContext).hideMap;
  return (
    <MapModal>
      <MapContainer
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
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
        </Marker>
      </MapContainer>
      <button className="button button-mapClose" onClick={closeMapctx}>
        x
      </button>
    </MapModal>
  );
}
export default Map;
