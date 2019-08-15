import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Colors, Spacing, Typography } from '../../styles';

const Title = styled.Text`
  ${Typography.headerText};
`;

const Wrapper = styled.View`
  padding-top: 40px;
  ${Spacing.sectionPadding};
  background-color: ${Colors.pidzBackground};
`;

const Header = ({ children }) => (
  <Wrapper>
    <Title>{ children }</Title>
  </Wrapper>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
