import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

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

export default Header;
