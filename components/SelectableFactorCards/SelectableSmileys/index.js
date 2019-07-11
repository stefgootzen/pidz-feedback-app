import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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

    return currentLevel === levelOfSmiley ? 1 : 0.6;
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
            }}
            icon="frown"
            size={20}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handlePress(1)}>
          <FontAwesomeIcon
            style={{
              opacity: this.determineOpacity(1),
              marginLeft: 4,
            }}
            icon="meh"
            size={20}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handlePress(2)}>
          <FontAwesomeIcon
            style={{
              opacity: this.determineOpacity(2),
              marginLeft: 4,
            }}
            size={20}
            icon="smile"
          />
        </TouchableWithoutFeedback>
      </FlexRow>
    );
  }
}

export default connect(SelectableSmileys);
