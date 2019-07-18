import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setFactors, setOtherFactors } from '../../actions/formActions';
import Button from '../../components/Button';
import factors from './factors';
import SelectableFactorCards from '../../components/SelectableFactorCards';
import OtherFactorCards from '../../components/OtherFactorCards';

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  ${Spacing.sectionPadding};
  height: 100%;
  justify-content: space-between; 
  background-color: ${Colors.background};
`;

const ButtonWrapper = styled.View`
  padding-top: 10px;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
`;

const initialFactors = factors.map(factor => ({
  name: factor,
  relevant: false,
  level: null,
}));

class Factors extends React.PureComponent {
  render() {
    const {
      subjectName,
      navigation,
      setFactors,
      setOtherFactors,
    } = this.props;

    return (
      <Formik
        initialValues={{
          factors: initialFactors,
          otherFactors: [],
        }}
        onSubmit={(values) => {
          setFactors(values.factors);

          // If user inserted other factors, also call setOtherFactors
          if (values.otherFactors.length >= 1) {
            setOtherFactors(values.otherFactors);
          }
          navigation.navigate('Closing');
        }}
      >
        {props => (
          <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
            <ScrollView>
              <BodyText>{`Hoe presteert ${subjectName} op de onderstaande competenties?`}</BodyText>
              <SelectableFactorCards
                onChange={value => props.setFieldValue('factors', value)}
                name="factors"
                values={props.values.factors}
              />
              <OtherFactorCards
                onChange={value => props.setFieldValue('otherFactors', value)}
                name="otherFactors"
                values={props.values.otherFactors}
              />
            </ScrollView>
            <ButtonWrapper>
              <Button
                onPress={props.handleSubmit}
                title="Volgende"
              />
            </ButtonWrapper>
          </StyledKeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

Factors.navigationOptions = {
  header: <Header>Feedback</Header>,
};

Factors.propTypes = {
  navigation: PropTypes.shape().isRequired,
  subjectName: PropTypes.string,
};

Factors.defaultProps = {
  subjectName: null,
};

const mapStateToProps = state => ({
  subjectName: state.form.subject.name,
});

const mapDispatchToProps = dispatch => ({
  setFactors: values => dispatch(setFactors(values)),
  setOtherFactors: values => dispatch(setOtherFactors(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Factors);
