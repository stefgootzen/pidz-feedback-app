import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button as NativeButton } from 'react-native-elements/src/index';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { Colors, Spacing, Typography } from '../../styles';
import onboardingData from '../../assets/onboardingData';
import Images from './images';

const Button = styled(NativeButton).attrs({
  disabledStyle: {
    opacity: 0.5,
  },
  containerStyle: {
    borderColor: Colors.pidzDarkBlue,
    borderWidth: 1.5,
  },
  buttonStyle: {
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: Colors.pidzDarkBlue,
  },
})``;

const Wrapper = styled.View`
  background-color: ${Colors.pidzLightBlue};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageWrapper = styled(LinearGradient)`
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.View`
  padding: ${Spacing.base}px;
  background-color: white;
  flex-shrink: 0;
`;

const standardText = css`
  text-align: center;
  color: ${Colors.pidzDarkBlue};
  font-family: 'lato-regular';
`;

const DescriptionText = styled.Text`
  ${standardText};
  margin-bottom: ${Spacing.largest};
`;

const StepText = styled.Text`
  ${standardText};
  margin-bottom: ${Spacing.smaller};
`;

const TitleText = styled.Text`
  ${Typography.headingText};
  text-align: center;
  margin-bottom: ${Spacing.smaller};
  ${standardText};
`;

const StyledImage = styled.Image`
  width: ${Dimensions.get('window').width * 0.5};
  resize-mode: contain;
  height: 250px;
`;

class Onboarding extends React.Component {
  handleButtonClick = () => {
    const {
      navigation,
      navigation: { state: { params: { route } } },
    } = this.props;

    navigation.navigate(route);
  };

  render() {
    const {
      navigation: { state: { params: { route } } },
    } = this.props;

    const {
      description,
      step,
      title,
    } = onboardingData[route.toLowerCase()];

    return (
      <Wrapper>
        <ImageWrapper
          colors={[Colors.pidzLightBlue, Colors.pidzLightBlue, 'white']}
          location={[0, 0.7, 1]}
        >
          <StyledImage
            source={Images[route.toLowerCase()]} // eslint-disable-line global-require
            alt="Onboarding image"
          />
        </ImageWrapper>
        <ContentWrapper>
          <StepText>{`Stap ${step}`}</StepText>
          <TitleText>{title}</TitleText>
          <DescriptionText>{description}</DescriptionText>
          <Button
            onPress={this.handleButtonClick}
            title="Volgende"
          />
        </ContentWrapper>

      </Wrapper>
    );
  }
}

Onboarding.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

Onboarding.navigationOptions = {
  header: null,
};

export default Onboarding;
