import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setFreelancerCompetence } from '../../actions/formActions';
import Button from '../../components/Button';
import freelancerCompetencesInfo from './freelancerCompetences';
import SelectableCards from '../../components/SelectableCards';

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
  constructor(props) {
    super(props);
    this.state = {
      currentCompetenceIndex: 0,
    };
  }

  determineNextStep = () => {
    const {
      navigation,
    } = this.props;

    const {
      currentCompetenceIndex,
    } = this.state;

    if (currentCompetenceIndex === freelancerCompetencesInfo.length - 1) {
      navigation.navigate('Factors');
    } else {
      this.setState(prevState => ({
        currentCompetenceIndex: prevState.currentCompetenceIndex + 1,
      }));
    }
  };

  render() {
    const {
      subjectName,
      setFreelancerCompetence,
    } = this.props;

    const {
      currentCompetenceIndex,
    } = this.state;

    const currentCompetenceInfo = freelancerCompetencesInfo[currentCompetenceIndex];
    const currentCompetenceName = currentCompetenceInfo.name;
    return (
      <Wrapper>
        <Formik
          onSubmit={(competence) => {
            setFreelancerCompetence(competence);
            this.determineNextStep(competence);
          }}
        >
          {props => (
            <FullHeightView>
              <HeadingText>{`Hoe presteert ${subjectName} op de onderstaande competentie?`}</HeadingText>
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
  subjectName: PropTypes.string,
};

FreelancerCompetences.defaultProps = {
  subjectName: null,
};

const mapStateToProps = state => ({
  subjectName: state.form.subject.name,
});

const mapDispatchToProps = dispatch => ({
  setFreelancerCompetence: values => dispatch(setFreelancerCompetence(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreelancerCompetences);
