import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { getData } from '../utils/getPhotos';
import { Spinner } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isLoading: false,
    showBtnLoad: false,
    isEmpty: false,
    error: null,
  };

  componentDidUpdate(p_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  setQueryValue = name => {
    this.setState({
      query: name,
      photos: [],
      isEmpty: false,
      page: 1,
      showBtnLoad: false,
    });
  };

  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await getData(query, page);
      const currentPage = this.state.page;
      this.setState(({ photos }) => ({
        photos: [...photos, ...hits],
        showBtnLoad: currentPage < Math.ceil(totalHits / currentPage),
      }));

      if (hits.length === 0) {
        this.setState({ isEmpty: true });
        return;
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleAddPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const show = this.state.photos.length > 0;
    const { showBtnLoad, isEmpty, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.setQueryValue} />
        {show && <ImageGallery data={this.state.photos} />}
        {isLoading && <Spinner />}
        {showBtnLoad && <Button onClick={this.handleAddPage} />}
        {error && <p textAlign="center">{error}</p>}
        {isEmpty && (
          <p textAlign="center">
            Nothing was found for your request! Please try another fech.
          </p>
        )}
      </>
    );
  }
}
