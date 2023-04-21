import { ButtonStyled } from './Button.styled';

function Button({ children, incrementPage }) {
  return (
    <ButtonStyled type="button" onClick={incrementPage}>
      {children}
    </ButtonStyled>
  );
}

export default Button;
