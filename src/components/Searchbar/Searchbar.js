import React from "react";
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "./Searchbar.styled";
import { ReactComponent as SearchIcon } from "../../icon/search_icon.svg";

class Searchbar extends React.Component {
  state = {
    imageName: "",
  };
  handleNameChange = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { imageName } = this.state;
    const { onSubmit } = this.props;

    if (imageName.trim() === "") {
      return alert("Please, enter a text!");
    }

    onSubmit(imageName);
    this.setState({
      imageName: "",
    });
  };

  render() {
    const { imageName } = this.state;
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <span>
              <SearchIcon />
            </span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            value={imageName}
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}
export default Searchbar;
