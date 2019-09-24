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
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import Header from '../../components/Header';
import CloseIcon from '../../components/CloseIcon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Wrapper = styled.View`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const InformationWrapper = styled.View`
  display: flex;
  flex-direction: row;
  border-width: 1px;
  border-color: ${Colors.darkGrey};
  padding: ${Spacing.small}px;
  border-radius: 3px;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const InputLabel = styled(Text)`
  ${Typography.inputLabel};
`;

const InformationText = styled(Text)`
  ${Typography.smallBodyText};
  opacity: 0.7;
  padding-left: ${Spacing.smaller}px;
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
        initialValues={{ suitable: 0 }}
        onSubmit={(values) => {
          const isSuitable = btnGroupYesNoToBool(values.suitable);

          setSuitability(isSuitable);
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
                value={props.values.suitable}
                onBlur={() => props.setFieldTouched('suitable')}
                errorMessage={props.touched.suitable && props.errors.suitable
                  ? props.errors.suitable
                  : undefined}
              />
            </InputWrapper>
            <InformationWrapper>
              <FontAwesomeIcon
                style={{
                  opacity: 0.6,
                }}
                size={20}
                icon="info-circle"
              />
              <InformationText>
                Ruimte voor aanvulling volgt
              </InformationText>
            </InformationWrapper>

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
