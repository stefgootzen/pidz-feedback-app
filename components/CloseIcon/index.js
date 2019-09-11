import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';
import { TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Colors } from '../../styles';

class CloseIcon extends React.PureComponent {
  handleSignOut = async () => {
    const {
      navigation,
    } = this.props;

    navigation.navigate('Selection');
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
          }}
          icon="times"
          size={20}
        />
      </TouchableWithoutFeedback>
    );
  }
}

CloseIcon.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default withNavigation(CloseIcon);
