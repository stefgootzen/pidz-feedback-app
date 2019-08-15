import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';
import { Colors, Typography, Spacing } from '../../styles';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${Spacing.base}px;
  background-color: white;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const StyledImage = styled.Image`
  width: 42px;
  height: 42px;
  margin-right: 10px;
  border-radius: 21px;
`;

const StyledText = styled.Text`
  ${Typography.userCardText};
`;

const UserCard = ({ name, picture }) => (
  <Wrapper>
    <StyledImage
      source={{ uri: picture }}
      alt="Profile"
    />
    <StyledText>{ name }</StyledText>
    <FontAwesomeIcon
      style={{
        marginLeft: 'auto',
        color: Colors.pidzBody,
      }}
      icon="angle-right"
      size={20}
    />
  </Wrapper>
);

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

export default UserCard;
