import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Button, ButtonLabel, Input } from './SearchForm.styled';

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const normilizedQuery = query.trim();

    onSubmit(normilizedQuery);
    setQuery(normilizedQuery);

    if (!normilizedQuery) {
      toast.warning('Please, enter your search query.');
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'query':
        setQuery(value);
        break;

      default:
        throw new Error('Unsupported input name');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Button type="submit">
        <ButtonLabel>Search</ButtonLabel>
      </Button>

      <Input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="query"
        value={query}
        onChange={handleInputChange}
      />
    </Form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
