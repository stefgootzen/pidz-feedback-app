import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import styled from 'styled-components';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setSubject } from '../../actions/formActions';
import { connect } from 'react-redux';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.background};
  height: 100%;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
`;

const Feedback = ({ navigation, subjectName }) => (
  <Wrapper>
    <BodyText>{`Vind je ${subjectName} geschikt om op deze afdeling te werken?`}</BodyText>
    <BodyText>Toelichting</BodyText>
    <Button
      onPress={() => navigation.navigate('Selection')}
      title="Volgende"
      accessibilityLabel="Ga naar de volgende pagina"
    />
  </Wrapper>
);

Feedback.navigationOptions = {
  header: <Header>Feedback</Header>,
};

Feedback.propTypes = {
  navigation: PropTypes.shape().isRequired,
  subjectName: PropTypes.string,
};

Feedback.defaultProps = {
  subjectName: null,
};

const mapStateToProps = state => ({
  subjectName: state.form.subject.name,
});

export default connect(
  mapStateToProps,
  null,
)(Feedback);
