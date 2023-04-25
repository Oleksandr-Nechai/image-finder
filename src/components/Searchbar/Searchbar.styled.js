import styled from 'styled-components';
import { Form, Field } from 'formik';

export const Shape = styled(Form)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
  width: 100%;
  height: ${props => props.theme.spacing.upperPrimary};

  display: flex;
  justify-content: center;

  padding: 10px;
  border-radius: 4px;

  background-color: ${props => props.theme.colors.primaryColor};
`;

export const Container = styled.div`
  position: relative;

  overflow: hidden;
  border-radius: 4px;

  box-shadow: ${props => props.theme.shadow.mainShadow};
`;

export const Input = styled(Field)`
  padding-left: 30px;
  height: 20px;
  border: none;
  outline: none;

  ::placeholder {
    color: ${props => props.theme.colors.primaryColor};
  }
`;

export const Button = styled.button`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  height: 100%;

  background-color: ${props => props.theme.colors.mainWhite};
  border: none;
  cursor: pointer;
  opacity: 0.6;

  :hover,
  :focus {
    opacity: 1;
  }
  :disabled {
    background-color: red;
  }
`;
