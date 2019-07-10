import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Colors, Spacing, Typography } from '../../styles';

const Title = styled.Text`
  ${Typography.headerText};
  margin-bottom: 10px;
`;

const Wrapper = styled.View`
  background-color: ${Colors.background};
  ${Spacing.sectionPadding};
  padding-top: 40px;
  padding-bottom: 10px;
`;

const Line = styled.View`
  width: 30px;
  border-bottom-color: ${Colors.tint};
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
