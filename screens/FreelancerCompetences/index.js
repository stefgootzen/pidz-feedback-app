import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setSuitability } from '../../actions/formActions';
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

const FreelancerCompetences = ({ setSuitability, navigation, subjectName }) => {
  const currentCompetenceInfo = freelancerCompetencesInfo[0];
  const currentCompetenceName = currentCompetenceInfo.name;
  console.log(currentCompetenceInfo);
  return (
    <Wrapper>
      <Formik
        onSubmit={(values) => {
          setSuitability(values);
          navigation.navigate('');
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
};

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
  setSuitability: values => dispatch(setSuitability(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreelancerCompetences);
