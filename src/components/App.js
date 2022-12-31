import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import pixabayAPI from 'services/pixabay-api';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

const App = () => {
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;
    getImages();
    // eslint-disable-next-line
  }, [query, page]);

  const getImages = async () => {
    setStatus('pending');
    try {
      const { hits, totalHits } = await pixabayAPI.searchImages(query, page);
      if (!hits.length) {
        toast.info('Oooh oh, there are no results that match your query.');
        return;
      }
      setImages([...images, ...hits]);
      if (page === 1) {
        toast.info(`Hooray! We found ${totalHits} image(s).`);
        calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setStatus('resolved');
    }
  };

  const calculateTotalPages = total => setTotalPages(Math.ceil(total / 12));

  const setNewQuery = query => {
    setStatus('idle');
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalPages(1);
  };

  const setNextPage = () => setPage(page => page + 1);

  const isVisibleButton = page < totalPages && status === 'resolved';

  return (
    <Layout>
      <Searchbar onSearch={setNewQuery} />

      {images.length > 0 && (
        <ImageGallery images={images} onClick={setActiveImage} />
      )}

      {activeImage && (
        <Modal url={activeImage} onClose={() => setActiveImage(null)} />
      )}

      {isVisibleButton && <Button onClick={setNextPage}>Load More</Button>}

      {status === 'pending' && <Loader />}

      <ToastContainer theme="colored" autoClose={3000} />
      <GlobalStyle />
    </Layout>
  );
};

export default App;
