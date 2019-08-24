import React from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { setAuthorizationHeader } from '../../utils/axios';

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
      setAuthorizationHeader(jwt);
      return navigation.navigate('Selection');
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
