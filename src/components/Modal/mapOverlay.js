import { Fragment, useContext } from "react";
import ReactDom from "react-dom";
import { LoginContext } from "../context/loginContext";

const Backdrop = (props) => {
  const hideMap = useContext(LoginContext).hideMap;
  return <div className="backdrop" onClick={hideMap}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal-map">
      <div className="map">{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("mapOverlay");

const MapModal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default MapModal;
