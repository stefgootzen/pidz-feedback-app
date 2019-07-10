import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setSuitability } from '../../actions/formActions';
import Button from '../../components/Button';

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

const FreelancerCompetences = ({ setSuitability, navigation, subjectName }) => (
  <Wrapper>
    <Formik
      initialValues={{ clarification: '', suitable: 0 }}
      onSubmit={(values) => {
        let isSuitable;
        if (values.suitable === 0) {
          isSuitable = true;
        } else if (values.suitable === 1) {
          isSuitable = false;
        }

        const clarification = values.clarification.length === 0 ? null : values.clarification;

        const suitableForDepartment = {
          isSuitable,
          clarification,
        };

        setSuitability(suitableForDepartment);
        navigation.navigate('');
      }}
    >
      {props => (
        <FullHeightView>
          <BodyText>{`Hoe presteert ${subjectName} op de onderstaande competentie?`}</BodyText>
          <Button
            onPress={props.handleSubmit}
            title="Volgende"
          />
        </FullHeightView>
      )}
    </Formik>
  </Wrapper>
);

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
