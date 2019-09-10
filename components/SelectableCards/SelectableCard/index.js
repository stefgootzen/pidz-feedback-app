import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors, Spacing, Typography } from '../../../styles';
import RadioButton from '../../RadioButton';

const Card = styled.View`
  background-color: white;
  border: 1px;
  opacity: ${props => (props.selected ? 1 : 0.8)};
  border-color: ${props => (props.selected ? Colors.pidzDarkBlue : 'white')};
  padding: ${Spacing.small}px;
  margin-bottom: ${Spacing.small}px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const SmallText = styled.Text`
  ${Typography.smallBodyText};
`;

const CardHeading = styled.Text`
  ${Typography.bodyText};
`;

class SelectableCard extends React.PureComponent {
  handleChange = () => {
    const {
      handleChange,
      level,
    } = this.props;

    handleChange(level);
  };

  renderRightText = (level) => {
    let text = '';
    switch (level) {
      case 0:
        text = 'Heeft veel verbetering nodig';
        break;
      case 1:
        text = 'Heeft verbetering nodig';
        break;
      case 2:
        text = 'Heeft geen verbetering nodig';
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
            <CardHeading>
              {this.renderRightText(level)}
            </CardHeading>
            <RadioButton
              color={Colors.pidzDarkBlue}
              isSelected={level === selectedLevel}
            />
          </Row>
          <SmallText>
            {description}
          </SmallText>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(SelectableCard);
