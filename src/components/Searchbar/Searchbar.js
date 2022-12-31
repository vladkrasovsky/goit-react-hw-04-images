import PropTypes from 'prop-types';
import SearchForm from 'components/SearchForm';
import { Header } from './Searchbar.styled';

const Searchbar = ({ onSearch }) => {
  return (
    <Header className="header">
      <SearchForm onSubmit={onSearch} />
    </Header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
