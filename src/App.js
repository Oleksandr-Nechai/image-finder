import { Component } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { validationRequest } from 'services/notifications';

import Section from './components/Section';

class App extends Component {
  state = {
    nameImage: '',
  };

  onSubmitForm = nameImage => {
    if (this.state.nameImage === nameImage) {
      validationRequest();
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
