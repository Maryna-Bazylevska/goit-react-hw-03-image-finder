import { ButtonLoadMore } from "./Button.styled";
const Button = ({ onLoadMore }) => {
  return (
    <ButtonLoadMore type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoadMore>
  );
};
export default Button;
