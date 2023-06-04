import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { getData } from '../utils/getPhotos';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    showBtnLoad: false,
    isEmpty: false,
  };

  componentDidUpdate(p_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  setQueryValue = name => {
    this.setState({ query: name, photos: [], isEmpty: false, page: 1 });
  };

  getPhotos = async (query, page) => {
    try {
      const { hits, totalHits, page: currentPage } = await getData(query, page);
      

      this.setState(({ photos }) => ({
        photos: [...photos, ...hits],
        showBtnLoad: currentPage < Math.ceil(totalHits / currentPage),
      }));
      console.log(hits.length);

      if (hits.length === 0) {
        this.setState({ isEmpty: true, query:'' });
        return
      }
    } catch (error) {}
  };

  handleAddPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const show = this.state.photos.length > 0;
    const { showBtnLoad, isEmpty } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.setQueryValue} />
        {show && <ImageGallery data={this.state.photos} />}
        {showBtnLoad && <Button onClick={this.handleAddPage} />}
        {isEmpty && (
          <>
            <p textalign="center">
              Nothing was found for your request! Please try another fech.
            </p>
          </>
        )}
      </>
    );
  }
}
