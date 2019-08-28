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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = ({ title, icon }) => (
  <Wrapper>
    <Title>{ title }</Title>
    { icon }
  </Wrapper>
);

Header.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
};

Header.defaultProps = {
  title: null,
  icon: null,
};


export default Header;
