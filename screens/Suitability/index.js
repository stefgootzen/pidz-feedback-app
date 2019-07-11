import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setSuitability } from '../../actions/formActions';
import ButtonGroup from '../../components/ButtonGroup';
import { btnGroupYesNoToBool } from '../../utils/btnGroupYesNoToBool';

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

const StyledTextInput = styled.TextInput`
  background-color: white;
  padding: ${Spacing.small}px;
  border-radius: 3px;
`;

const Suitability = ({ setSuitability, navigation, subjectName }) => (
  <Wrapper>
    <Formik
      initialValues={{ clarification: '', suitable: 0 }}
      onSubmit={(values) => {
        const isSuitable = btnGroupYesNoToBool(values.suitable);

        const clarification = values.clarification.length === 0 ? null : values.clarification;

        const suitableForDepartment = {
          isSuitable,
          clarification,
        };

        setSuitability(suitableForDepartment);
        navigation.navigate('FreelancerCompetences');
      }}
    >
      {props => (
        <FullHeightView>
          <BodyText>{`Vind je ${subjectName} geschikt om op deze afdeling te werken?`}</BodyText>
          <ButtonGroup
            onPress={value => props.setFieldValue('suitable', value)}
            selectedIndex={props.values.suitable}
            buttons={['Ja', 'Nee']}
            value={props.values.suitable} // TODO: check if this is needed
            onBlur={() => props.setFieldTouched('suitable')}
            errorMessage={
              props.touched.suitable && props.errors.suitable ? props.errors.suitable : undefined
            }
          />
          <BodyText>Toelichting</BodyText>
          <StyledTextInput
            onChangeText={props.handleChange('clarification')}
            onBlur={props.handleBlur('clarification')}
            value={props.values.clarification}
            underlineColorAndroid={Colors.darkGrey}
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

Suitability.navigationOptions = {
  header: <Header>Feedback</Header>,
};

Suitability.propTypes = {
  navigation: PropTypes.shape().isRequired,
  subjectName: PropTypes.string,
};

Suitability.defaultProps = {
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
)(Suitability);
