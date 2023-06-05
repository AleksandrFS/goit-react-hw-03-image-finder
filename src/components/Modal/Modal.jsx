import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.current.target === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
