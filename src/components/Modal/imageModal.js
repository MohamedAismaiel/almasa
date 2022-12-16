import { Fragment, useContext } from "react";
import ReactDom from "react-dom";
import { LoginContext } from "../context/loginContext";

const Backdrop = (props) => {
  const hideImages = useContext(LoginContext).hideImageGallery;
  return <div className="backdrop" onClick={hideImages}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal-images ">
      <div className="content">{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("imageOverlay");

const ImageModal = (props) => {
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

export default ImageModal;
