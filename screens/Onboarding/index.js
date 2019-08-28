import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavigationActions } from 'react-navigation';
import { Dimensions, View } from 'react-native';
import { Spacing, Typography } from '../../styles';
import Button from '../../components/Button';
import onboardingData from '../../assets/onboardingData';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  height: 100%;
  width: 100%;
`;

const ContentWrapper = styled.View`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const CenteredText = styled.Text`
  text-align: center;
`;

const FatBodyText = styled(CenteredText)`
  ${Typography.fatBodyText};
`;

const HeadingText = styled(CenteredText)`
  ${Typography.headingText};
  margin-bottom: 7px;
`;

const StyledImage = styled.Image`
  width: ${Dimensions.get('window').width * 0.8};
  height: 250px;
  resize-mode: contain;
  align-self: center;
  margin: 15px 0;
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
      image,
      step,
      title,
    } = onboardingData[route.toLowerCase()];

    return (
      <View>
        <Wrapper>
          <ContentWrapper>
            <FatBodyText>{`Stap ${step}`}</FatBodyText>
            <StyledImage
              source={require('../../assets/placeholder.png')} // eslint-disable-line global-require
              alt="Onboarding image"
            />
            <HeadingText>{title}</HeadingText>
            <CenteredText>{description}</CenteredText>
          </ContentWrapper>
          <Button
            onPress={this.handleButtonClick}
            title="Volgende"
          />
        </Wrapper>
      </View>
    );
  }
}

Onboarding.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Onboarding;
