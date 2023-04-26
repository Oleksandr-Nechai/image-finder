import { GoEyeClosed } from 'react-icons/go';
import PropTypes from 'prop-types';

import { Component } from 'react';
import Modal from 'components/Modal';
import {
  GalleryItem,
  Image,
  LargeImage,
  ModalButton,
} from './ImageGalleryItem.styled';

class ImageGalleryItems extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { image } = this.props;
    console.log(image);

    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <Image src={image.webformatURL} alt={image.tags} loading="lazy" />
        </GalleryItem>
        {this.state.isOpen && (
          <Modal onClickModal={this.toggleModal}>
            <LargeImage
              src={image.largeImageURL}
              alt={image.tags}
              loading="lazy"
            />
            <ModalButton type="button" onClick={this.toggleModal}>
              <GoEyeClosed />
            </ModalButton>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItems;

ImageGalleryItems.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
