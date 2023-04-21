import { Component } from 'react';
import { createPortal } from 'react-dom';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { Overlay, ModalStyle } from './Modal.styled';

const modalPortal = document.querySelector('#modal-root');

class Modal extends Component {
  targetElement = null;
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.targetElement = document.querySelector('#modal-root');
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    enableBodyScroll(this.targetElement);
    clearAllBodyScrollLocks();
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClickModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClickModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalStyle>{this.props.children}</ModalStyle>
      </Overlay>,
      modalPortal
    );
  }
}

export default Modal;
