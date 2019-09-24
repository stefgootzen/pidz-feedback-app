import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Button as NativeButton } from 'react-native-elements';
import { Colors, Spacing, Typography } from '../../styles';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import InputWrapper from '../../components/InputWrapper';
import { setRemarks } from '../../actions/formActions';
import Header from '../../components/Header';
import CloseIcon from '../../components/CloseIcon';
import ButtonGroup from '../../components/ButtonGroup';

const Wrapper = styled.View`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const StyledTextInput = styled.TextInput`
  padding: ${Spacing.smallest}px;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const InputLabel = styled.Text`
  ${Typography.inputLabel};
`;

const NavigationContainer = styled.View`
  margin-top: auto;
  margin-bottom: ${Spacing.small};
  display: flex;
  align-items: center;
`;

const NavigationText = styled.Text`
  font-size: ${Typography.smallFontSize};
  font-family: 'lato-bold';
  color: ${Colors.pidzDarkBlue};
  padding: ${Spacing.base}px;
`;

const Button = styled(NativeButton).attrs({
  disabledStyle: {
    opacity: 0.5,
  },
  containerStyle: {
    alignSelf: 'stretch',
  },
  buttonStyle: {
    backgroundColor: Colors.pidzDarkBlue,
  },
  titleStyle: {
    color: 'white',
    fontFamily: 'lato-bold',
  },
})``;

const buttonGroupValues = ['PIDZ', 'Planner', 'ZZP\'er'];

class Remarks extends React.Component {
  render() {
    const {
      freelancerName,
    } = this.props;

    return (
      <Wrapper>
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={(values) => {
            const recipients = values.recipients.map(value => buttonGroupValues[value]);
            const remark = {
              message: values.message,
              recipients,
            };

            const {
              navigation,
              setRemarks,
            } = this.props;

            setRemarks(remark);
            navigateWithOnboarding(navigation, 'Closing');
          }}
        >
          {props => (
            <FullHeightView>
              <InputWrapper moreMargin>
                <InputLabel>{`Wil je nog iets kwijt over (je feedback betreft) ${freelancerName}?`}</InputLabel>
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Bericht</InputLabel>
                <StyledTextInput
                  onChangeText={props.handleChange('message')}
                  value={props.values.message}
                  underlineColorAndroid={Colors.darkGrey}
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Verzenden naar</InputLabel>
                <ButtonGroup
                  onPress={value => props.setFieldValue('recipients', value)}
                  selectedIndexes={props.values.recipients}
                  buttons={buttonGroupValues}
                  selectMultiple
                />
              </InputWrapper>
              <NavigationContainer>
                <NavigationText onPress={this.navigateToNextRoute}>
                    Stap overslaan
                </NavigationText>
                <Button
                  onPress={props.handleSubmit}
                  title="Volgende"
                  disabled={
                    !props.values.message
                    || !props.values.recipients
                  }
                />
              </NavigationContainer>
            </FullHeightView>
          )}
        </Formik>
      </Wrapper>
    );
  }
}

Remarks.propTypes = {
  freelancerName: PropTypes.string,
};

Remarks.defaultProps = {
  freelancerName: null,
};

Remarks.navigationOptions = {
  header: (
    <Header
      title="Opmerkingen"
      icon={<CloseIcon />}
    />
  ),
};

const mapStateToProps = state => ({
  freelancerName: state.form.freelancer.name,
});

const mapDispatchToProps = dispatch => ({
  setRemarks: values => dispatch(setRemarks(values)),
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Remarks));
