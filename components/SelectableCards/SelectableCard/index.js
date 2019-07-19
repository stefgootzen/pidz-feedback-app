import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors, Spacing } from '../../../styles';

const Card = styled.View`
  background-color: white;
  border: 1px;
  opacity: ${props => (props.selected ? 1 : 0.6)};
  border-color: ${props => (props.selected ? Colors.pidzDarkBlue : 'white')};
  padding: ${Spacing.small}px;
  margin-bottom: ${Spacing.small}px;
  border-radius: 5px;
  align-items: center;
`;

const CenteredText = styled.Text`
  text-align: center;
`;

class SelectableCard extends React.PureComponent {
  handleChange = () => {
    const {
      handleChange,
      level,
    } = this.props;

    handleChange(level);
  };

  renderRightSmiley = (level) => {
    switch (level) {
      case 0:
        return <FontAwesomeIcon icon="frown" />;
      case 1:
        return <FontAwesomeIcon icon="meh" />;
      case 2:
        return <FontAwesomeIcon icon="smile" />;
      default:
        return null;
    }
  };

  render() {
    const {
      level,
      selectedLevel,
      description,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.handleChange}>
        <Card selected={level === selectedLevel}>
          <View>
            { this.renderRightSmiley(level)}
          </View>
          <CenteredText>
            {description}
          </CenteredText>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(SelectableCard);
