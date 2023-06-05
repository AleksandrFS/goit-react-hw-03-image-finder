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

  toggleModal = () => {

  }

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { showModal} = this.state;
    return (
      <li className="gallery-item" onClick={this.showModal}>
        <img src={webformatURL} alt={tags} />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={this.showModal}
          />
        )}
      </li>
    );
  }
}
