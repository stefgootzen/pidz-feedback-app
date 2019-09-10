import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Colors } from '../../styles';

const Container = styled.View`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${props => (props.isSelected ? props.color : 'black')};
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.isSelected ? 0.8 : 0.5)};
`;

const Checkmark = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${props => props.color};
`;

const RadioButton = ({ isSelected, color }) => (
  <Container
    color={color}
    isSelected={isSelected}
  >
    {isSelected && <Checkmark color={color} />}
  </Container>
);

RadioButton.propTypes = {
  isSelected: PropTypes.bool,
};

RadioButton.defaultProps = {
  isSelected: false,
};

export default RadioButton;
