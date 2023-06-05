import { Component } from 'react';

import { BallTriangle } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

import { getData } from '../utils/getPhotos';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isLoading: false,
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
    const { showBtnLoad, isEmpty, isLoading, showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.setQueryValue} />
        {show && <ImageGallery data={this.state.photos} onClose={showModal} />}
        {isEmpty && (
          <>
            <p textalign="center">
              Nothing was found for your request! Please try another fech.
            </p>
          </>
        )}
        {isLoading && (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#ec0867"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        )}

        {showBtnLoad && <Button onClick={this.handleAddPage} />}
      </>
    );
  }
}
