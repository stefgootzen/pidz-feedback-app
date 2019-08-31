import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import { Button as NativeButton } from 'react-native-elements/src/index';
import { Colors, Spacing, Typography } from '../../styles';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import { setOnboardingState } from '../../actions/onboardingActions';


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
`;

const DescriptionText = styled.Text`
  ${standardText};
  margin-bottom: ${Spacing.largest};
`;

const TitleText = styled.Text`
  ${Typography.headingText};
  text-align: center;
  margin-bottom: ${Spacing.smaller};
  ${standardText};
`;

const StyledImage = styled.Image`
  width: ${Dimensions.get('window').width * 0.8};
  resize-mode: contain;
  height: 250px;
`;

class Closing extends React.Component {
  componentDidMount() {
    const {
      review,
      setOnboardingState,
    } = this.props;

    setOnboardingState(false);

    axiosInstance.put('/reviews', review)
      .catch(globalErrorHandler);
  }

  render() {
    const {
      navigation,
    } = this.props;

    return (
      <Wrapper>
        <ImageWrapper
          colors={[Colors.pidzLightBlue, Colors.pidzLightBlue, 'white']}
          location={[0, 0.7, 1]}
        >
          <StyledImage
            source={require('../../assets/bedankt.png')} // eslint-disable-line global-require
            alt="Bedankt image"
          />
        </ImageWrapper>
        <ContentWrapper>
          <TitleText>Bedankt voor je tijd</TitleText>
          <DescriptionText>Samen verbeteren we het zorglandschap!</DescriptionText>
          <Button
            onPress={() => navigation.navigate('Selection')}
            title="Afronden"
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}

Closing.propTypes = {
  navigation: PropTypes.shape().isRequired,
  review: PropTypes.shape().isRequired,
};

Closing.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  review: state.form,
});

const mapDispatchToProps = dispatch => ({
  setOnboardingState: values => dispatch(setOnboardingState(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Closing);
