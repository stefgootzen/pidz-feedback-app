import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors, Spacing, Typography } from '../../../styles';

const Card = styled.View`
  background-color: white;
  border: 1px;
  opacity: ${props => (props.selected ? 1 : 0.8)};
  border-color: ${props => (props.selected ? Colors.pidzDarkBlue : 'white')};
  padding: ${Spacing.small}px;
  margin-bottom: ${Spacing.small}px;
  border-radius: 5px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${Colors.darkGrey};
  border-bottom-width: 1px;
  padding-bottom: 3px;
  margin-bottom: 3px;
`;

const CardHeader = styled.Text`
  ${Typography.fatBodyText};
  text-transform: uppercase;
  margin-left: 10px;
  opacity: 0.7;
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
        return (
          <FontAwesomeIcon
            style={{
              color: Colors.pidzRed,
            }}
            icon="frown"
          />
        );
      case 1:
        return (
          <FontAwesomeIcon
            style={{
              color: Colors.pidzOrange,
            }}
            icon="meh"
          />
        );
      case 2:
        return (
          <FontAwesomeIcon
            style={{
              color: Colors.pidzGreen,
            }}
            icon="smile"
          />
        );
      default:
        return null;
    }
  };

  renderRightText = (level) => {
    let text = '';
    switch (level) {
      case 0:
        text = 'Slecht';
        break;
      case 1:
        text = 'Gemiddeld';
        break;
      case 2:
        text = 'Goed';
        break;
      default:
        return null;
    }
    return text;
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
          <Row>
            { this.renderRightSmiley(level)}
            <CardHeader>
              { this.renderRightText(level)}
            </CardHeader>
          </Row>
          <Text>
            {description}
          </Text>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(SelectableCard);
