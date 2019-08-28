import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';
import { TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { removeJwt } from '../../actions/jwtActions';
import { removeAuthorizationHeader } from '../../utils/axios';
import { Colors } from '../../styles';

class SignoutIcon extends React.PureComponent {
  handleSignOut = async () => {
    const {
      navigation,
    } = this.props;

    removeAuthorizationHeader();
    removeJwt();
    navigation.navigate('Login');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleSignOut}>
        <FontAwesomeIcon
          style={{
            color: Colors.pidzBody,
            transform: [
              { scaleX: -1 },
            ],
            opacity: 0.8,
          }}
          icon="sign-out-alt"
          size={20}
        />
      </TouchableWithoutFeedback>
    );
  }
}

SignoutIcon.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(SignoutIcon);
