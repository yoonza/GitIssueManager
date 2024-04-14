import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  background-color: white;
  color: black;
  padding: 10px;
  text-align: center;
`;

const Header = ({ organizationName, repositoryName }) => {
  return (
    <Container>
      <h2>{organizationName} / {repositoryName}</h2>
    </Container>
  );
};

export default Header;
