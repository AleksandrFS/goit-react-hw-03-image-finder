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
      this.props.onClick();
    }
  };

  handleBackDropClick = e => {
   
    if (e.target === e.currentTarget) {
      console.log(e.target);
      console.log(e.currentTarget);
      this.props.onClick();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          <img
            src={this.props.largeImageURL}
            alt={this.props.tags}
            
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
