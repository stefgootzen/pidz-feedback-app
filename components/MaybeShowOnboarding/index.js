import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dimensions, Modal } from 'react-native';
import onboarding from './onboarding';
import { Spacing, Typography } from '../../styles';
import Button from '../Button';

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

class MaybeShowOnboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowing: true,
    };
  }

  handleButtonClick = () => {
    this.setState({
      isShowing: false,
    });
  };

  render() {
    const {
      onboardingId,
    } = this.props;

    const {
      description,
      image,
      step,
      title,
    } = onboarding[onboardingId];

    const {
      shouldShowOnboarding,
    } = this.props;

    const {
      isShowing,
    } = this.state;

    if (isShowing && shouldShowOnboarding) {
      return (
        <Modal animationType="none">
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
        </Modal>
      );
    }

    return null;
  }
}

MaybeShowOnboarding.propTypes = {
  shouldShowOnboarding: PropTypes.bool,
};

MaybeShowOnboarding.defaultProps = {
  shouldShowOnboarding: null,
};

const mapStateToProps = state => ({
  shouldShowOnboarding: state.onboarding.shouldShowOnboarding,
});

// const mapDispatchToProps = dispatch => ({
//   setFreelancerCompetence: values => dispatch(setFreelancerCompetence(values)),
// });

export default connect(
  mapStateToProps,
  null,
)(MaybeShowOnboarding);
