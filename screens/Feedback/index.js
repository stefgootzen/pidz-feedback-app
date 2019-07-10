import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import styled from 'styled-components';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.background};
  height: 100%;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
`;

const Feedback = ({ navigation }) => (
  <Wrapper>
    <BodyText>Vind je Inge geschikt om op deze afdeling te werken?</BodyText>
    <BodyText>Toelichting</BodyText>
    <Button
      onPress={() => navigation.navigate('Selection')}
      title="Volgende"
      accessibilityLabel="Ga naar de volgende pagina"
    />
  </Wrapper>
);

Feedback.navigationOptions = {
  header: <Header>Selection</Header>,
};

Feedback.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Feedback;
