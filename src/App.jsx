import './styles/style.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from './shared/Button/Button';
import { Modal } from 'shared/Modal/Modal';
import { useState, useEffect, useRef } from 'react';
import { fetchImages } from './services/pixabayAxios';
import { Loader } from 'shared/Loader/Loader';

const INITIAL_STATE = {
  images: [],
  query: '',
  error: null,
  page: 1,
  isModal: false,
  imgDetails: {},
  status: 'idle',
  lastPage: false,
};

export const App = () => {
  const [images, setImages] = useState(INITIAL_STATE.images);
  const [query, setQuery] = useState(INITIAL_STATE.query);
  const [error, setError] = useState(INITIAL_STATE.error);
  const [page, setPage] = useState(INITIAL_STATE.page);
  const [isModal, setIsModal] = useState(INITIAL_STATE.isModal);
  const [imgDetails, setImgDetails] = useState(INITIAL_STATE.imgDetails);
  const [status, setStatus] = useState(INITIAL_STATE.status);
  const lastPage = useRef(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        setStatus('pending');
        const { data } = await fetchImages(page, query);

        if (data.totalHits === 0) {
          showErrorAlert('Nothing found for your request');
        }
        setImages(prevState => [...prevState, ...data.hits]);
        setStatus('success');

        if (page >= Math.ceil(data.totalHits / 12) && data.total !== 0) {
          lastPage.current = true;
          showErrorAlert('You have watched all of images!');
        }
      } catch ({ message }) {
        setError(message || 'Ooops...something wrong! Try again later!');
        setStatus('error');
        showErrorAlert(error);
      }
    };
    if (query) {
      getImages();
    }
  }, [page, query]);

  const handleLoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setImages(INITIAL_STATE.images);
    setPage(INITIAL_STATE.page);
    lastPage.current = INITIAL_STATE.lastPage;
  };

  const showModal = (largeImageURL, tags) => {
    setIsModal(true);
    setImgDetails({ largeImageURL, tags });
  };

  const hideModal = () => {
    setIsModal(INITIAL_STATE.isModal);
    setImgDetails(INITIAL_STATE.imgDetails);
  };

  const showErrorAlert = message => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  return (
    <>
      <Searchbar handleFormSubmit={handleFormSubmit} />
      {images && images.length > 0 && (
        <>
          <ImageGallery images={images} showModal={showModal} />
          {status === 'success' && !lastPage.current && (
            <Button handleLoadMoreBtn={handleLoadMoreBtn} />
          )}
        </>
      )}
      {status === 'pending' && <Loader />}
      {isModal && (
        <Modal hideModal={hideModal}>
          <img src={imgDetails.largeImageURL} alt={imgDetails.tags} />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};
