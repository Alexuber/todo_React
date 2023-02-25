import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SearchForm.module.scss';

export const SearchForm = ({ handleFormSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Search field is empty!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    handleFormSubmit(query);
    setQuery('');
  };

  return (
    <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles.SearchFormButton}></button>
      <span className={styles.SearchFormButtonLabel}>Search</span>
      <input
        onChange={handleInputChange}
        className={styles.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
      />
    </form>
  );
};

SearchForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};
