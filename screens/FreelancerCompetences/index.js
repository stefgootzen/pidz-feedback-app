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
import SelectableCardsFormik from '../../components/SelectableCardsFormik';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.background};
  height: 100%;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
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
      navigation.navigate('Selection');
    } else {
      this.setState(prevState => ({
        currentCompetenceIndex: prevState.currentCompetenceIndex + 1,
      }));
    }
  };

  render() {
    const {
      subjectName,
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
              <BodyText>{`Hoe presteert ${subjectName} op de onderstaande competentie?`}</BodyText>
              <BodyText>{currentCompetenceName}</BodyText>
              <SelectableCardsFormik
                items={currentCompetenceInfo}
                value={props.values[currentCompetenceName]}
                errorMessage={
                props.touched[currentCompetenceName]
                && props.errors[currentCompetenceName]
                  ? props.error[currentCompetenceName] : undefined
              }
                name={currentCompetenceName}
              />
              <Button
                onPress={props.handleSubmit}
                title="Volgende"
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
