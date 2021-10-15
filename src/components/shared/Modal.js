import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Backdrop = ({ onClick }) => {
  return <div className='backdrop' onClick={onClick} />;
};

const ModalOverlay = (props) => {
  return <div className='modal'>{props.children}</div>;
};

const Modal = ({ onClose, children, ...rest }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('overlays-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...rest}>{children}</ModalOverlay>,
        document.getElementById('overlays-root')
      )}
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;
