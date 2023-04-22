import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Gallery, GalleryList, GalleryFooter } from './ImageGallery.styled';
import { getImages } from 'services/api';
import ImageGalleryItems from 'components/ImageGalleryItem';
import Button from 'components/Button';
import {
  findImages,
  rejectRequest,
  handlerServerError,
  endSearch,
} from 'services/notifications';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalHits: null,
    visible: false,
    perPage: 24,
  };

  async componentDidMount() {
    await this.fetchImages(
      this.state.page,
      this.state.perPage,
      this.props.nameImage
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      await this.resetPage();
      await this.fetchImages(
        this.state.page,
        this.state.perPage,
        this.props.nameImage
      );

      return;
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      await this.fetchImages(
        this.state.page,
        this.state.perPage,
        this.props.nameImage
      );
    }
  }

  fetchImages = async (page, per_page, nameImage) => {
    try {
      this.setState({ visible: true });
      const users = await getImages(page, per_page, nameImage);
      users.totalHits =
        users.totalHits === 500 ? users.totalHits + 1 : users.totalHits;
      if (!users.totalHits) {
        rejectRequest();
        return;
      }
      findImages(users.hits.length);

      if (
        users.totalHits <=
        this.state.perPage * (this.state.page - 1) + users.hits.length
      ) {
        endSearch();
      }
      if (page === 1) {
        this.setState(() => ({
          images: [...users.hits],
          totalHits: users.totalHits,
        }));
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...users.hits],
          totalHits: users.totalHits,
        }));
      }
    } catch (error) {
      handlerServerError(error.message);
    } finally {
      this.setState({ visible: false });
    }
  };

  resetPage = () => this.setState({ page: 1, images: [], totalHits: null });

  incrementPage = () =>
    this.setState(prevState => ({ page: prevState.page + 1 }));

  render() {
    return (
      <Gallery>
        <GalleryList>
          {this.state.images.map(image => (
            <ImageGalleryItems image={image} key={image.id} />
          ))}
        </GalleryList>

        <GalleryFooter style={{ height: '54px', padding: '10px 0' }}>
          <ThreeDots
            height="34"
            width="100"
            radius="9"
            color="rgb(0,96,255)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              justifyContent: 'center',
            }}
            wrapperClassName=""
            visible={this.state.visible}
          />

          {this.state.totalHits > this.state.images.length &&
            !this.state.visible && (
              <Button incrementPage={this.incrementPage}>Load more</Button>
            )}
        </GalleryFooter>
      </Gallery>
    );
  }
}

export default ImageGallery;
