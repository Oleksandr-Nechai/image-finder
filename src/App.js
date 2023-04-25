import { Component } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { validationRequest } from 'services/notifications';

import Section from './components/Section';

class App extends Component {
  state = {
    nameImage: '',
    visible: false,
  };

  componentDidMount() {
    const savedQuery = JSON.parse(localStorage.getItem('nameImage'));
    if (savedQuery) {
      this.setState({ nameImage: savedQuery });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.nameImage !== this.state.nameImage) {
      localStorage.setItem('nameImage', JSON.stringify(this.state.nameImage));
    }
  }

  onSubmitForm = nameImage => {
    if (this.state.nameImage === nameImage) {
      validationRequest();
      return;
    }
    this.setState({ nameImage: nameImage });
  };

  toggleVisibleLoader = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    return (
      <>
        <Section>
          <Searchbar
            onSubmitForm={this.onSubmitForm}
            visible={this.state.visible}
          />
        </Section>
        <Section>
          {this.state.nameImage && (
            <ImageGallery
              nameImage={this.state.nameImage}
              visible={this.state.visible}
              toggleVisible={this.toggleVisibleLoader}
            />
          )}
        </Section>
      </>
    );
  }
}

export default App;
