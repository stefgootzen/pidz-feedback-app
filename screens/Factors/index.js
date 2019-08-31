import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setFactors, setOtherFactors } from '../../actions/formActions';
import Button from '../../components/Button';
import SelectableFactorCards from '../../components/SelectableFactorCards';
import OtherFactorCards from '../../components/OtherFactorCards';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  ${Spacing.sectionPadding};
  height: 100%;
  justify-content: space-between; 
  background-color: ${Colors.pidzBackground};
`;

const ButtonWrapper = styled.View`
  padding-top: 10px;
`;

const HeadingText = styled.Text`
  ${Typography.headingText};
  margin-bottom: ${Spacing.base};
`;

class Factors extends React.PureComponent {
  state = {
    initialFactors: [],
  };

  componentDidMount() {
    const {
      departmentId,
    } = this.props;

    axiosInstance.get(`/factors?departmentId=${departmentId}`)
      .then(({ data: factors }) => {
        const initialFactors = factors.map(factor => ({
          id: factor.id,
          name: factor.name,
          relevant: false,
          level: null,
        }));

        this.setState({
          initialFactors,
        });
      })
      .catch(globalErrorHandler);
  }

  render() {
    const {
      freelancerName,
      navigation,
      setFactors,
      setOtherFactors,
    } = this.props;

    const {
      initialFactors,
    } = this.state;

    if (initialFactors.length === 0) {
      return (
        <StyledKeyboardAvoidingView>
          <ActivityIndicator />
        </StyledKeyboardAvoidingView>
      );
    }
    
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

          navigateWithOnboarding(navigation, 'Closing');
        }}
      >
        {props => (
          <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
            <ScrollView>
              <HeadingText>{`Hoe presteert ${freelancerName} op de onderstaande competenties?`}</HeadingText>
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
  header: <Header title="Feedback" />,
};

Factors.propTypes = {
  navigation: PropTypes.shape().isRequired,
  freelancerName: PropTypes.string,
};

Factors.defaultProps = {
  freelancerName: null,
};

const mapStateToProps = state => ({
  departmentId: state.form.department.id,
  freelancerName: state.form.freelancer.name,
});

const mapDispatchToProps = dispatch => ({
  setFactors: values => dispatch(setFactors(values)),
  setOtherFactors: values => dispatch(setOtherFactors(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Factors);
