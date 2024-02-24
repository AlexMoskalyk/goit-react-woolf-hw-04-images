import React, { useEffect, useState } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { fetchPicture } from './api/Api';
import Searchbar from 'components/searchbar/Searchbar';
import Loader from './loader/Loader';
import Button from './button/Button';

export const App = () => {
  const [page, setPage] = useState(1);

  const [images, setImages] = useState([]);

  const [filter, setFilter] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState({
    url: '',
    alt: '',
  });

  const [loader, setLoader] = useState(false);

  const [showBtn, setShowBtn] = useState(false);

  const onImageClick = obj => {
    setImage({
      url: obj.largeImageURL,
      alt: obj.tags,
    });

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleFilterSubmit = filter => {
    setFilter(filter);
    setPage(1);
    setImages([]);
  };

  const handleOnButtonClick = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (filter === '') return;
    const getPictures = async () => {
      setLoader(prev => !prev);
      try {
        const data = await fetchPicture(filter, page);
        if (data.hits.length === 0)
          return alert('Opps! There are no pictures available');

        setImages(prev => [...prev, ...data.hits]);

        setShowBtn(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        alert(error.message);
      } finally {
        setLoader(prev => !prev);
      }
    };
    getPictures();
  }, [page, filter]);

  return (
    <>
      <div>
        <Searchbar handleFilter={handleFilterSubmit} />
        <ImageGallery images={images} onImageClick={onImageClick} />
      </div>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={image.url} alt={image.alt} />
        </Modal>
      )}
      {showBtn && <Button onClick={handleOnButtonClick} />}
      {loader && <Loader />}
    </>
  );
};
