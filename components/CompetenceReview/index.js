import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Colors, Spacing, Typography } from '../../styles';
import Button from '../Button';
import CompetenceRating from '../CompetenceRating';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import InputWrapper from '../InputWrapper';

const Wrapper = styled.View`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const SpaceBetween = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const InputLabel = styled.Text`
  ${Typography.inputLabel};
`;

const StepText = styled.Text`
  color: ${Colors.pidzDarkBlue};
  font-family: 'lato-regular';
`;

const CompetenceName = styled.Text`
  font-size: ${Typography.extraExtraLargeFontSize};
  color: ${Colors.pidzDarkBlue};
  font-family: 'lato-bold';
`;

class CompetenceReview extends React.Component {
  state = {
    currentCompetenceIndex: 0,
    competences: [],
    competenceReviews: [],
  };

  componentDidMount() {
    const {
      apiPath,
    } = this.props;

    axiosInstance.get(apiPath)
      .then(({ data: competences }) => {
        this.setState({
          competences,
        });
      })
      .catch(globalErrorHandler);
  }

  determineNextStep = () => {
    const {
      navigation,
      setCompetenceAction,
      nextStep,
    } = this.props;

    const {
      currentCompetenceIndex,
      competences,
      competenceReviews,
    } = this.state;

    if (currentCompetenceIndex === competences.length - 1) {
      setCompetenceAction(competenceReviews);
      navigateWithOnboarding(navigation, nextStep);
    } else {
      this.setState(prevState => ({
        currentCompetenceIndex: prevState.currentCompetenceIndex + 1,
      }));
    }
  };

  render() {
    const {
      freelancerName,
    } = this.props;

    const {
      currentCompetenceIndex,
      competences,
    } = this.state;

    if (competences.length === 0) {
      return (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      );
    }

    const currentCompetenceInfo = competences[currentCompetenceIndex];
    const currentCompetenceName = currentCompetenceInfo.name;

    return (
      <Wrapper>
        <Formik
          onSubmit={(competence) => {
            const competenceReview = {
              id: currentCompetenceInfo.id,
              level: competence[currentCompetenceName],
            };

            this.setState(prevState => ({
              competenceReviews: [competenceReview, ...prevState.competenceReviews],
            }));

            this.determineNextStep(competence);
          }}
        >
          {props => (
            <FullHeightView>
              <InputWrapper moreMargin>
                <InputLabel>{`Hoe presteert ${freelancerName} op de onderstaande competentie?`}</InputLabel>
              </InputWrapper>
              <SpaceBetween>
                <CompetenceName>{currentCompetenceName}</CompetenceName>
                <StepText>{` ${currentCompetenceIndex + 1} van ${competences.length}`}</StepText>
              </SpaceBetween>
              <CompetenceRating
                selectedLevel={props.values[currentCompetenceName]}
                name={currentCompetenceName}
              />
              <Button
                onPress={props.handleSubmit}
                title="Volgende"
                disabled={
                  !Object.prototype.hasOwnProperty.call(props.values, currentCompetenceName)
                }
              />
            </FullHeightView>
          )}
        </Formik>
      </Wrapper>
    );
  }
}

CompetenceReview.propTypes = {
  freelancerName: PropTypes.string,
  setCompetenceAction: PropTypes.func.isRequired,
  apiPath: PropTypes.string.isRequired,
  nextStep: PropTypes.string.isRequired,
};

CompetenceReview.defaultProps = {
  freelancerName: null,
};

const mapStateToProps = state => ({
  freelancerName: state.form.freelancer.name,
});

export default withNavigation(connect(
  mapStateToProps,
  null,
)(CompetenceReview));
