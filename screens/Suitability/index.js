import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Button from '../../components/Button';
import { Colors, Spacing, Typography } from '../../styles';
import { setSuitability } from '../../actions/formActions';
import ButtonGroup from '../../components/ButtonGroup';
import { btnGroupYesNoToBool } from '../../utils/btnGroupYesNoToBool';
import InputWrapper from '../../components/InputWrapper';
import StyledTextInput from '../../components/StyledTextInput';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import Header from '../../components/Header';
import CloseIcon from '../../components/CloseIcon';

const Wrapper = styled.View`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const InputLabel = styled(Text)`
  ${Typography.inputLabel};
`;

const Suitability = (props) => {
  const {
    setSuitability,
    navigation,
    freelancerName,
  } = props;

  return (
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
          navigateWithOnboarding(navigation, 'PidzCompetences');
        }}
      >
        {props => (
          <FullHeightView>
            <InputWrapper>
              <InputLabel>{`Vind je ${freelancerName} geschikt om op deze afdeling te werken?`}</InputLabel>
              <ButtonGroup
                onPress={value => props.setFieldValue('suitable', value)}
                selectedIndex={props.values.suitable}
                buttons={['Ja', 'Nee']}
                value={props.values.suitable} // TODO: check if this is needed
                onBlur={() => props.setFieldTouched('suitable')}
                errorMessage={props.touched.suitable && props.errors.suitable
                  ? props.errors.suitable
                  : undefined}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>Mogelijke toelichting</InputLabel>
              <StyledTextInput
                onChangeText={props.handleChange('clarification')}
                onBlur={props.handleBlur('clarification')}
                value={props.values.clarification}
                underlineColorAndroid={Colors.darkGrey}
              />
            </InputWrapper>

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

Suitability.navigationOptions = {
  header: (
    <Header
      title="Geschiktheid"
      icon={<CloseIcon />}
    />
  ),
};

Suitability.propTypes = {
  navigation: PropTypes.shape().isRequired,
  freelancerName: PropTypes.string,
};

Suitability.defaultProps = {
  freelancerName: null,
};

const mapStateToProps = state => ({
  freelancerName: state.form.freelancer.name,
});

const mapDispatchToProps = dispatch => ({
  setSuitability: values => dispatch(setSuitability(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Suitability);
