import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Spacing } from '../../styles';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${Spacing.base}px;
  background-color: white;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 42px;
  height: 42px;
  margin-right: 10px;
`;

const StyledText = styled.Text`
  ${Typography.userCardText};
`;

const Arrow = styled(StyledText)`
  margin-left: auto;
`;

const UserCard = ({ name, picture }) => (
  <Wrapper>
    <StyledImage
      source={{ uri: picture }}
      alt="Profile"
    />
    <StyledText>{ name }</StyledText>
    <Arrow>{'>'}</Arrow>
  </Wrapper>
);

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

export default UserCard;
