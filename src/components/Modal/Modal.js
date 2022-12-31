import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Wrapper, Image } from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKeydown);
  }

  handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };

  handleEscKeydown = ({ code }) => {
    if (code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { url } = this.props;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <Wrapper>
          <Image src={url} alt="" />
        </Wrapper>
      </Overlay>,
      ModalRoot
    );
  }
}

export default Modal;
