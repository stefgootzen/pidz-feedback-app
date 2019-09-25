import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button as NativeButton } from 'react-native-elements';
import { Colors, Spacing, Typography } from '../../styles';
import CompetenceRating from '../../components/CompetenceRating';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import InputWrapper from '../../components/InputWrapper';
import { setOtherDepartmentCompetences } from '../../actions/formActions';
import Header from '../../components/Header';
import CloseIcon from '../../components/CloseIcon';

const Wrapper = styled.View`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  padding: ${Spacing.smallest}px;
`;

const SpaceBetween = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const InputLabel = styled.Text`
  ${Typography.inputLabel};
`;

const NavigationContainer = styled.View`
  margin-top: auto;
  margin-bottom: ${Spacing.small};
  display: flex;
  align-items: center;
`;

const NavigationText = styled.Text`
  font-size: ${Typography.smallFontSize};
  font-family: 'lato-bold';
  color: ${Colors.pidzDarkBlue};
  padding: ${Spacing.base}px;
`;

const Button = styled(NativeButton).attrs({
  disabledStyle: {
    opacity: 0.5,
  },
  containerStyle: {
    alignSelf: 'stretch',
  },
  buttonStyle: {
    backgroundColor: Colors.pidzDarkBlue,
  },
  titleStyle: {
    color: 'white',
    fontFamily: 'lato-bold',
  },
})``;

class OtherDepartmentCompetences extends React.Component {
  resetNameAndLevel = (formikProps) => {
    formikProps.setFieldValue('otherDepartmentCompetenceName', '');
    formikProps.setFieldValue('otherDepartmentCompetenceLevel', null);
  };

  navigateToNextRoute = () => {
    const {
      navigation,
    } = this.props;

    navigateWithOnboarding(navigation, 'FreelancerCompetences');
  };

  render() {
    const {
      freelancerName,
    } = this.props;

    return (
      <Wrapper>
        <Formik
          initialValues={{
            otherDepartmentCompetenceName: '',
            otherDepartmentCompetenceLevel: null,
          }}
          onSubmit={(values) => {
            const competenceReview = [{
              level: values.otherDepartmentCompetenceLevel,
              name: values.otherDepartmentCompetenceName,
            }];

            const {
              setOtherDepartmentCompetences,
            } = this.props;

            setOtherDepartmentCompetences(competenceReview);
            this.navigateToNextRoute();
          }}
        >
          {props => (
            <FullHeightView>
              <InputWrapper moreMargin>
                <InputLabel>{`Is er nog een andere competentie waarop je ${freelancerName} feedback wil geven?`}</InputLabel>
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Competentie</InputLabel>
                <SpaceBetween>
                  <StyledTextInput
                    onChangeText={props.handleChange('otherDepartmentCompetenceName')}
                    value={props.values.otherDepartmentCompetenceName}
                    underlineColorAndroid={Colors.darkGrey}
                  />
                  <TouchableWithoutFeedback onPress={() => this.resetNameAndLevel(props)}>
                    <FontAwesomeIcon
                      style={{
                        opacity: props.values.otherDepartmentCompetenceName.length === 0 ? 0.3 : 1,
                        marginLeft: 12,
                      }}
                      size={20}
                      icon="trash"
                    />
                  </TouchableWithoutFeedback>
                </SpaceBetween>
              </InputWrapper>

              <CompetenceRating
                values={[0, 1, 2]}
                labels={['Heeft veel verbetering nodig', 'Heeft verbetering nodig', 'Heeft geen verbetering nodig']}
                selectedLevel={props.values.otherDepartmentCompetenceLevel}
                name="otherDepartmentCompetenceLevel"
                isDisabled={props.values.otherDepartmentCompetenceName.length === 0}
              />
              <NavigationContainer>
                <NavigationText onPress={this.navigateToNextRoute}>
                    Stap overslaan
                </NavigationText>
                <Button
                  onPress={props.handleSubmit}
                  title="Volgende"
                  disabled={
                    !props.values.otherDepartmentCompetenceName
                    || props.values.otherDepartmentCompetenceLevel === null
                  }
                />
              </NavigationContainer>
            </FullHeightView>
          )}
        </Formik>
      </Wrapper>
    );
  }
}

OtherDepartmentCompetences.propTypes = {
  freelancerName: PropTypes.string,
};

OtherDepartmentCompetences.defaultProps = {
  freelancerName: null,
};

OtherDepartmentCompetences.navigationOptions = {
  header: (
    <Header
      title="Overige competentie"
      icon={<CloseIcon />}
    />
  ),
};

const mapStateToProps = state => ({
  freelancerName: state.form.freelancer.name,
});

const mapDispatchToProps = dispatch => ({
  setOtherDepartmentCompetences: values => dispatch(setOtherDepartmentCompetences(values)),
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtherDepartmentCompetences));
