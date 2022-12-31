import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Button, ButtonLabel, Input } from './SearchForm.styled';

class SearchForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    const normilizedQuery = query.trim();

    this.props.onSubmit(normilizedQuery);
    this.setState({ query: normilizedQuery });

    if (!normilizedQuery) {
      toast.warning('Please, enter your search query.');
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { query } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
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
          onChange={this.handleInputChange}
        />
      </Form>
    );
  }
}

export default SearchForm;
