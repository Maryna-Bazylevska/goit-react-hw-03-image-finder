import { Item, ItemImage } from "./ImageGalleryItem.styled";
const ImageGalleryItem = ({ id, webformatURL, largeImageURL, onOpenModal }) => {
  return (
    <Item key={id} onClick={() => onOpenModal(largeImageURL)}>
      <ItemImage src={webformatURL} alt="" />
    </Item>
  );
};
export default ImageGalleryItem;
