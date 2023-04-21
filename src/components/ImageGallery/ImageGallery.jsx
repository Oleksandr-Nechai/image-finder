import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Gallery, GalleryList, GalleryFooter } from './ImageGallery.styled';
import { getImages } from 'services/api';
import ImageGalleryItems from 'components/ImageGalleryItem';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalHits: null,
    visible: false,
  };

  async componentDidMount() {
    await this.fetchImages(this.state.page, this.props.nameImage);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      await this.resetPage();
      await this.fetchImages(this.state.page, this.props.nameImage);
      return;
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      await this.fetchImages(this.state.page, this.props.nameImage);
    }
  }

  fetchImages = async (page, nameImage) => {
    try {
      this.setState({ visible: true });
      const users = await getImages(page, nameImage);

      if (!users.totalHits) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.success(`Hooray! We found ${users.hits.length} images.`);
      if (page === 1) {
        this.setState(() => ({
          images: [...users.hits],
          totalHits:
            users.totalHits === 500 ? users.totalHits + 1 : users.totalHits,
        }));
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...users.hits],
          totalHits:
            users.totalHits === 500 ? users.totalHits + 1 : users.totalHits,
        }));
      }
    } catch (error) {
      Notify.failure(
        `Something went wrong. Please try again. ${error.message}`
      );
    } finally {
      this.setState({ visible: false });
    }
  };

  resetPage = () => this.setState({ page: 1, images: [], totalHits: null });

  incrementPage = () =>
    this.setState(prevState => ({ page: prevState.page + 1 }));

  render() {
    const x =
      this.state.totalHits && this.state.totalHits <= this.state.images.length;

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
          {x && Notify.failure('111')}
        </GalleryFooter>
      </Gallery>
    );
  }
}

export default ImageGallery;
