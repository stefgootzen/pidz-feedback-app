import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Wrapper = styled.View`
  padding-top: 40px;
  padding-bottom: 20px;
`;

const Line = styled.View`
  width: 30px;
  border-bottom-color: black;
  border-bottom-width: 2px;
`;

const Header = ({ children }) => (
  <Wrapper>
    <Title>{ children }</Title>
    <Line />
  </Wrapper>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
