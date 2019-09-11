import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ActivityIndicator, KeyboardAvoidingView, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Colors, Spacing, Typography } from '../../styles';
import { setDepartmentCompetences, setOtherDepartmentCompetences } from '../../actions/formActions';
import Button from '../../components/Button';
import RadioTags from '../../components/RadioTags';
import OtherCompetenceCards from '../../components/OtherCompetenceCards';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import Header from '../../components/Header';
import SignoutIcon from '../../components/SignoutIcon';

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  height: 100%;
  justify-content: space-between; 
  background-color: ${Colors.pidzBackground};
`;

const ButtonWrapper = styled.View`
  padding-top: 10px;
`;

const InputLabel = styled.Text`
  ${Typography.inputLabel};
  margin-bottom: ${Spacing.base};
`;

const FatText = styled.Text`
  ${Typography.inputLabel};
`;

class OldDepartmentCompetences extends React.PureComponent {
  state = {
    initialDepartmentCompetences: [],
    buttonIsDisabled: false,
  };

  componentDidMount() {
    const {
      departmentId,
    } = this.props;

    axiosInstance.get(`/departmentCompetences?departmentId=${departmentId || 1}`)
      .then(({ data: departmentCompetences }) => {
        const initialDepartmentCompetences = departmentCompetences.map(departmentCompetence => ({
          id: departmentCompetence.id,
          name: departmentCompetence.name,
          level: null,
        }));

        this.setState({
          initialDepartmentCompetences,
        });
      })
      .catch(globalErrorHandler);
  }

  handleButtonAccessibility = (isDisabled) => {
    this.setState({
      buttonIsDisabled: isDisabled,
    });
  };

  render() {
    const {
      freelancerName,
      navigation,
      setDepartmentCompetences,
      setOtherDepartmentCompetences,
    } = this.props;

    const {
      initialDepartmentCompetences,
      buttonIsDisabled,
    } = this.state;

    if (initialDepartmentCompetences.length === 0) {
      return (
        <StyledKeyboardAvoidingView>
          <ActivityIndicator />
        </StyledKeyboardAvoidingView>
      );
    }

    return (
      <Formik
        initialValues={{
          departmentCompetences: initialDepartmentCompetences,
          otherDepartmentCompetences: [],
        }}
        onSubmit={(values) => {
          const cleanedDepartmentCompetences = values.departmentCompetences
            .map((departmentCompetence) => {
              if (departmentCompetence.level === 'ignore') {
              departmentCompetence.level = null; // eslint-disable-line
              }
              return departmentCompetence;
            });

          setDepartmentCompetences(cleanedDepartmentCompetences);

          // If user inserted other department competences, also call setOtherDepartmentCompetences
          if (values.otherDepartmentCompetences.length >= 1) {
            setOtherDepartmentCompetences(values.otherDepartmentCompetences);
          }

          navigateWithOnboarding(navigation, 'FreelancerCompetences');
        }}
      >
        {props => (
          <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={50}>
            <ScrollView>
              <InputLabel>{`Hoe presteert ${freelancerName} op de onderstaande competenties?`}</InputLabel>
              {
                props.values.departmentCompetences.map(departmentCompetence => (
                  <React.Fragment key={departmentCompetence.id}>
                    <FatText>{departmentCompetence.name}</FatText>
                    <RadioTags
                      onChange={(name, value) => {
                        const departmentCompetencesCopy = JSON.parse(
                          JSON.stringify(props.values.departmentCompetences),
                        );
                        const relevantDepartmentCompetence = departmentCompetencesCopy
                          .find(departmentCompetence => departmentCompetence.name === name);
                        relevantDepartmentCompetence.level = value;
                        return props.setFieldValue('departmentCompetences', departmentCompetencesCopy);
                      }}
                      value={departmentCompetence.level}
                      values={['ignore', 0, 1, 2]}
                      labels={['n.v.t.', 'Heeft veel verbetering nodig', 'Heeft verbetering nodig', 'Heeft geen verbetering nodig']}
                      name={departmentCompetence.name}
                    />
                  </React.Fragment>
                ))
              }
              <OtherCompetenceCards
                handleButtonAccessibility={this.handleButtonAccessibility}
                onChange={value => props.setFieldValue('otherDepartmentCompetences', value)}
                name="otherDepartmentCompetences"
                values={props.values.otherDepartmentCompetences}
              />
            </ScrollView>
            <ButtonWrapper>
              <Button
                disabled={buttonIsDisabled}
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

OldDepartmentCompetences.navigationOptions = {
  header: (
    <Header
      title="Afdelings competenties"
      icon={<SignoutIcon />}
    />
  ),
};

OldDepartmentCompetences.propTypes = {
  navigation: PropTypes.shape().isRequired,
  freelancerName: PropTypes.string,
};

OldDepartmentCompetences.defaultProps = {
  freelancerName: null,
};

const mapStateToProps = state => ({
  departmentId: state.form.department.id,
  freelancerName: state.form.freelancer.name,
});

const mapDispatchToProps = dispatch => ({
  setDepartmentCompetences: values => dispatch(setDepartmentCompetences(values)),
  setOtherDepartmentCompetences: values => dispatch(setOtherDepartmentCompetences(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OldDepartmentCompetences);
