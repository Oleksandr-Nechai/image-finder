import styled from 'styled-components';

export const Gallery = styled.div`
  padding-top: ${props => props.theme.spacing.upperPrimary};
  padding-bottom: 20px;
`;

export const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  gap: 12px;
`;

export const GalleryFooter = styled.div`
  height: '54px';
  padding: '10px 0';
`;
