import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Wrapper, Image } from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

const Modal = ({ url, onClose }) => {
  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKeydown = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKeydown);

    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Wrapper>
        <Image src={url} alt="" />
      </Wrapper>
    </Overlay>,
    ModalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
