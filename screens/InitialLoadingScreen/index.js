import React from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import axiosInstance, { setAuthorizationHeader } from '../../utils/axios';


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
      const {
        data: { verified },
      } = await axiosInstance.get('/auth/verify');

      if (verified) {
        return navigation.navigate('Selection');
      }
    }

    return navigation.navigate('Login');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
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
