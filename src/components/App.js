import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import pixabayAPI from 'services/pixabay-api';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

class App extends Component {
  state = {
    status: 'idle',
    query: '',
    images: [],
    activeImage: null,
    page: 1,
    totalPages: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;

    if (!query) return;

    if (page !== prevPage || query !== prevQuery) {
      this.getImages();
    }
  }

  async getImages() {
    const { query, page, images } = this.state;

    this.setStatus('pending');

    try {
      const { hits, totalHits } = await pixabayAPI.searchImages(query, page);

      if (!hits.length) {
        toast.info('Oooh oh, there are no results that match your query.');
        return;
      }

      this.setState({
        images: [...images, ...hits],
      });

      if (page === 1) {
        toast.info(`Hooray! We found ${totalHits} image(s).`);
        this.calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setStatus('resolved');
    }
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  setNewQuery = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalPages: 1,
      status: 'idle',
    });
  };

  setActiveImageUrl = url => this.setState({ activeImage: url });

  setNextPage = () => this.setState(({ page }) => ({ page: page + 1 }));

  setStatus = status => this.setState({ status });

  render() {
    const { status, images, activeImage, page, totalPages } = this.state;

    const isVisibleButton = page < totalPages && status === 'resolved';

    return (
      <Layout>
        <Searchbar onSearch={this.setNewQuery} />

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.setActiveImageUrl} />
        )}

        {activeImage && (
          <Modal
            url={activeImage}
            onClose={() => this.setActiveImageUrl(null)}
          />
        )}

        {isVisibleButton && (
          <Button onClick={this.setNextPage}>Load More</Button>
        )}

        {status === 'pending' && <Loader />}

        <ToastContainer theme="colored" autoClose={3000} />
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;
