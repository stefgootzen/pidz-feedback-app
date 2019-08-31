import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axiosInstance, { globalErrorHandler, setAuthorizationHeader } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import { Colors } from '../../styles';

const StyledView = styled.View`
  height: 100%;
  background-color: ${Colors.pidzLightBlue};
`;
class InitialLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkForJwt();
  }

  checkForJwt = async () => {
    const {
      jwt,
      navigation,
    } = this.props;

    if (jwt) {
      // Set Auth header on Axios client
      setAuthorizationHeader(jwt);

      // Verify the Auth header
      try {
        const {
          data: { verified },
        } = await axiosInstance.get('/auth/verify');

        if (verified) {
          return navigateWithOnboarding(navigation, 'Selection');
        }
      } catch (error) {
        globalErrorHandler(error);
        return navigation.navigate('Login');
      }
    }

    return navigation.navigate('Login');
  };

  render() {
    return (
      <StyledView />
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.jwt.jwt,
});

export default connect(
  mapStateToProps,
  null,
)(InitialLoadingScreen);
