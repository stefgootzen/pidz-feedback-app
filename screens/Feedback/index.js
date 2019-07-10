import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-native-elements';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setSuitability } from '../../actions/formActions';

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

const StyledButton = styled(Button).attrs({
  containerStyle: {
    marginTop: 'auto',
    marginBottom: Spacing.small,
  },
  buttonStyle: {
    backgroundColor: Colors.tint,
  },
  textStyle: {
    color: 'white',
  },
})``;

const StyledButtonGroup = styled(ButtonGroup).attrs({
  buttonStyle: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: Colors.pidzDarkBlue,
  },
  selectedButtonStyle: {
    backgroundColor: Colors.pidzDarkBlue,
  },
  selectedTextStyle: {
    color: 'white',
  },
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
})``;

const Feedback = ({ setSuitability, navigation, subjectName }) => (
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
          <BodyText>{`Vind je ${subjectName} geschikt om op deze afdeling te werken?`}</BodyText>
          <StyledButtonGroup
            onPress={value => props.setFieldValue('suitable', value)}
            selectedIndex={props.values.suitable}
            buttons={['Ja', 'Nee']}
            value={props.values.suitable}
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
          <StyledButton
            onPress={props.handleSubmit}
            title="Submit"
          />
        </FullHeightView>
      )}
    </Formik>
  </Wrapper>
);

Feedback.navigationOptions = {
  header: <Header>Feedback</Header>,
};

Feedback.propTypes = {
  navigation: PropTypes.shape().isRequired,
  subjectName: PropTypes.string,
};

Feedback.defaultProps = {
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
)(Feedback);
