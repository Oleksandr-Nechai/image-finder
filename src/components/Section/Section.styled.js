import styled from 'styled-components';

export const Container = styled.section`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`;

export const Header = styled.div`
  margin-bottom: 10px;
  color: ${props => props.theme.colors.primeryColor};
`;
