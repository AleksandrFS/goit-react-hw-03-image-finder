import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  
  state = {
    showModal: false,
  };

  showModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <li className="gallery-item">
        <img src={webformatURL} alt={tags} />
        <Modal
          onClick={this.showModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      </li>
    );
  }
}
