import PropTypes from "prop-types";

import { Container, Header } from "./Section.styled";

function Section({ text, children, header }) {
  return (
    <Container>
      {header ? (
        <Header>
          <h1>{text}</h1>
        </Header>
      ) : (
        <Header>
          <h2>{text}</h2>
        </Header>
      )}
      {children}
    </Container>
  );
}

export default Section;

Section.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
