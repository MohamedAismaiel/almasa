import { Fragment, useContext } from "react";
import ReactDom from "react-dom";
import { LoginContext } from "../context/loginContext";

const Backdrop = (props) => {
  const hideEmailForm = useContext(LoginContext).hideEmailForm;
  return <div className="backdrop" onClick={hideEmailForm}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal-email">
      <div className="emailForm">{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("emailOverlay");

const EmailFormModal = (props) => {
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

export default EmailFormModal;
