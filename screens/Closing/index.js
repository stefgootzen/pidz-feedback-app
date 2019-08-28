import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import { setOnboardingState } from '../../actions/onboardingActions';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
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
        <FullHeightView>
          <BodyText>Bedankt voor het invullen van de review!</BodyText>
          <Button
            onPress={() => navigateWithOnboarding(navigation, 'Selection')}
            title="Volgende"
          />
        </FullHeightView>
      </Wrapper>
    );
  }
}

Closing.navigationOptions = {
  header: <Header title="Bedankt" />,
};

Closing.propTypes = {
  navigation: PropTypes.shape().isRequired,
  review: PropTypes.shape().isRequired,
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
