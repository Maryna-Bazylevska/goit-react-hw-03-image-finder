import React from "react";
import Button from "../Button";
import ImageGalleryItem from "../ImageGalleryItem";
import Loader from "../Loader";
import * as fetch from "../service/fetchImages";
import { GaleryList } from "./ImageGallery.styled";
import Modal from "../Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
export default class ImageGallery extends React.Component {
  state = {
    items: [],
    pageNumber: 1,
    error: null,
    status: Status.IDLE,
    showModal: false,
    largeImageURL: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ status: Status.PENDING });
      this.onSearch(imageName);
    }
  }
  onSearch = () => {
    const { imageName } = this.props;
    fetch
      .fetchImages(imageName, 1)
      .then((data) => {
        if (data.hits.length < 1) {
          this.setState((state) => ({
            status: Status.IDLE,
          }));
          return alert("Something wrong!");
        } else {
          this.setState((prevState) => ({
            items: data.hits,
            status: Status.RESOLVED,
            pageNumber: prevState.pageNumber + 1,
          }));
        }
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }))
      .finally(this.handleScroll());
  };
  handleScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  onLoadMore = (e) => {
    fetch
      .fetchImages(this.props.imageName, this.state.pageNumber)
      .then((data) =>
        this.setState((prevState) => {
          return {
            pageNumber: prevState.pageNumber + 1,
            items: [...prevState.items, ...data.hits],
            status: "resolved",
          };
        })
      )
      .finally(this.handleScroll());
  };
  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };
  onLargeImgClick = (imageUrl) => {
    this.setState({ largeImageURL: imageUrl });
    this.toggleModal();
  };

  render() {
    const { items, status, showModal, largeImageURL } = this.state;
    if (status === "idle") {
      return <></>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <div>
          {showModal && (
            <Modal onClose={this.toggleModal} imageUrl={largeImageURL}>
              <img src={largeImageURL} alt="" />
            </Modal>
          )}

          <GaleryList>
            {items.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                onOpenModal={this.onLargeImgClick}
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
          </GaleryList>
          {items.length > 0 && <Button onLoadMore={this.onLoadMore} />}
        </div>
      );
    }
  }
}
