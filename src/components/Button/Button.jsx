import { ButtonStyled } from './Button.styled';
import PropTypes from 'prop-types';

function Button({ children, incrementPage }) {
  return (
    <ButtonStyled type="button" onClick={incrementPage}>
      {children}
    </ButtonStyled>
  );
}

export default Button;

Button.propTypes = {
  incrementPage: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
