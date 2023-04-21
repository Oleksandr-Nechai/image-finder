import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from './components/Searchbar';
import ImageGallery from 'components/ImageGallery';

import Section from './components/Section';

class App extends Component {
  state = {
    nameImage: '',
  };

  onSubmitForm = nameImage => {
    if (this.state.nameImage === nameImage) {
      Notify.failure('Change search.Please try again.');
      return;
    }
    this.setState({ nameImage: nameImage });
  };

  render() {
    return (
      <>
        <Section>
          <Searchbar onSubmitForm={this.onSubmitForm} />
        </Section>
        <Section>
          {this.state.nameImage && (
            <ImageGallery nameImage={this.state.nameImage} />
          )}
        </Section>
      </>
    );
  }
}

export default App;
