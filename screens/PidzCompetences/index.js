import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import EmptyHeader from '../../components/EmptyHeader';
import { Colors, Spacing, Typography } from '../../styles';
import { setPidzCompetences } from '../../actions/formActions';
import Button from '../../components/Button';
import SelectableCards from '../../components/SelectableCards';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const InputLabel = styled.Text`
  ${Typography.inputLabel};
  margin-top: ${Spacing.base}px;
  margin-bottom: ${Spacing.small}px;
`;

const CompetenceName = styled.Text`
  font-size: ${Typography.extraExtraLargeFontSize};
  color: ${Colors.pidzDarkBlue};
  font-weight: bold;
`;

class PidzCompetences extends React.Component {
  state = {
    currentCompetenceIndex: 0,
    competences: [],
    pidzCompetenceReviews: [],
  };

  componentDidMount() {
    axiosInstance.get('/pidzCompetences')
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
      setPidzCompetences,
    } = this.props;

    const {
      currentCompetenceIndex,
      competences,
      pidzCompetenceReviews,
    } = this.state;

    if (currentCompetenceIndex === competences.length - 1) {
      setPidzCompetences(pidzCompetenceReviews);
      navigateWithOnboarding(navigation, 'DepartmentCompetences');
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
            const pidzCompetenceReview = {
              id: currentCompetenceInfo.id,
              level: competence[currentCompetenceName],
            };

            this.setState(prevState => ({
              pidzCompetenceReviews: [pidzCompetenceReview, ...prevState.pidzCompetenceReviews],
            }));

            this.determineNextStep(competence);
          }}
        >
          {props => (
            <FullHeightView>
              <InputLabel>{`Hoe presteert ${freelancerName} op de onderstaande competentie?`}</InputLabel>
              <CompetenceName>{currentCompetenceName}</CompetenceName>
              <SelectableCards
                competence={currentCompetenceInfo}
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

PidzCompetences.navigationOptions = {
  header: <EmptyHeader />,
};

PidzCompetences.propTypes = {
  navigation: PropTypes.shape().isRequired,
  setPidzCompetences: PropTypes.func.isRequired,
  freelancerName: PropTypes.string,
};

PidzCompetences.defaultProps = {
  freelancerName: null,
};

const mapStateToProps = state => ({
  freelancerName: state.form.freelancer.name,
});

const mapDispatchToProps = dispatch => ({
  setPidzCompetences: values => dispatch(setPidzCompetences(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PidzCompetences);