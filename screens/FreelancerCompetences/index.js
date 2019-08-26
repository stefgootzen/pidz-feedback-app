import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Header from '../../components/Header';
import MaybeShowOnboarding from '../../components/MaybeShowOnboarding';
import { Colors, Spacing, Typography } from '../../styles';
import { setFreelancerCompetence } from '../../actions/formActions';
import Button from '../../components/Button';
import SelectableCards from '../../components/SelectableCards';
import axiosInstance from '../../utils/axios';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const FatBodyText = styled.Text`
  ${Typography.fatBodyText};
`;

const HeadingText = styled.Text`
  ${Typography.headingText};
  margin-bottom: ${Spacing.base};
`;

class FreelancerCompetences extends React.Component {
  state = {
    currentCompetenceIndex: 0,
    competences: [],
  };

  async componentDidMount() {
    try {
      const {
        data: competences,
      } = await axiosInstance.get('/competences');

      console.log(competences);

      this.setState({
        competences,
      });
    } catch (error) {
      console.log(error);
    }
  }

  determineNextStep = () => {
    const {
      navigation,
    } = this.props;

    const {
      currentCompetenceIndex,
      competences,
    } = this.state;

    if (currentCompetenceIndex === competences.length - 1) {
      navigation.navigate('Factors');
    } else {
      this.setState(prevState => ({
        currentCompetenceIndex: prevState.currentCompetenceIndex + 1,
      }));
    }
  };

  render() {
    const {
      freelancerName,
      setFreelancerCompetence,
    } = this.props;

    const {
      currentCompetenceIndex,
      competences,
    } = this.state;

    if (competences.length === 0) {
      return null;
    }

    const currentCompetenceInfo = competences[currentCompetenceIndex];
    const currentCompetenceName = currentCompetenceInfo.name;

    return (
      <Wrapper>
        <MaybeShowOnboarding onboardingId="freelancerCompetences" />
        <Formik
          onSubmit={(competence) => {
            console.log(competence);
            const data = {
              id: currentCompetenceInfo.id,
              level: competence[currentCompetenceName],
            };

            setFreelancerCompetence(data);
            this.determineNextStep(competence);
          }}
        >
          {props => (
            <FullHeightView>
              <HeadingText>{`Hoe presteert ${freelancerName} op de onderstaande competentie?`}</HeadingText>
              <FatBodyText>{currentCompetenceName}</FatBodyText>
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

FreelancerCompetences.navigationOptions = {
  header: <Header>Feedback</Header>,
};

FreelancerCompetences.propTypes = {
  navigation: PropTypes.shape().isRequired,
  freelancerName: PropTypes.string,
};

FreelancerCompetences.defaultProps = {
  freelancerName: null,
};

const mapStateToProps = state => ({
  freelancerName: state.form.freelancer.name,
});

const mapDispatchToProps = dispatch => ({
  setFreelancerCompetence: values => dispatch(setFreelancerCompetence(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreelancerCompetences);
