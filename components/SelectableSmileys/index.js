import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../../styles';

const FlexRow = styled(View)`
  display: flex;
  flex-direction: row;
`;

class SelectableSmileys extends React.PureComponent {
  determineOpacity = (levelOfSmiley) => {
    const {
      isDisabled,
      currentLevel,
    } = this.props;

    if (isDisabled) {
      return 0.3;
    }

    return currentLevel === levelOfSmiley ? 1 : 0.4;
  };

  handlePress = (level) => {
    const {
      handleChange,
      isDisabled,
    } = this.props;

    if (isDisabled) {
      return;
    }

    handleChange(level);
  };

  render() {
    return (
      <FlexRow>
        <TouchableWithoutFeedback onPress={() => this.handlePress(0)}>
          <FontAwesomeIcon
            style={{
              opacity: this.determineOpacity(0),
              color: Colors.pidzRed,
            }}
            icon="frown"
            size={30}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handlePress(1)}>
          <FontAwesomeIcon
            style={{
              opacity: this.determineOpacity(1),
              marginLeft: 7,
              color: Colors.pidzOrange,
            }}
            icon="meh"
            size={30}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handlePress(2)}>
          <FontAwesomeIcon
            style={{
              opacity: this.determineOpacity(2),
              marginLeft: 7,
              color: Colors.pidzGreen,
            }}
            size={30}
            icon="smile"
          />
        </TouchableWithoutFeedback>
      </FlexRow>
    );
  }
}

export default connect(SelectableSmileys);
