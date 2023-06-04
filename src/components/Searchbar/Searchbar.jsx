import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchName } = this.state;
    this.props.onSubmit(searchName);
    this.setState({ searchName: ''})
  };

  handleBtnSearch = e => {
    const { value } = e.target;
    this.setState({ searchName: value });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleBtnSearch}
          />
        </form>
      </header>
    );
  }
}
