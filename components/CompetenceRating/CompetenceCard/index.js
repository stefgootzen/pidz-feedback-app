import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import { Colors, Spacing, Typography } from '../../../styles';
import RadioButton from '../../RadioButton';

const determineOpacity = (isSelected, isDisabled) => {
  let opacity = 0.8;
  if (isSelected) {
    opacity = 1;
  }
  if (isDisabled) {
    opacity = 0.1;
  }
  return opacity;
};

const Card = styled.View`
  background-color: white;
  border: 1px;
  opacity: ${props => determineOpacity(props.isSelected, props.isDisabled)};
  border-color: ${props => (props.isSelected ? Colors.pidzDarkBlue : 'white')};
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

class CompetenceCard extends React.PureComponent {
  handleChange = () => {
    const {
      handleChange,
      level,
      isDisabled,
    } = this.props;

    if (isDisabled) {
      return;
    }

    handleChange(level);
  };

  render() {
    const {
      isDisabled,
      isSelected,
      description,
      label,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.handleChange}>
        <Card
          isSelected={isSelected}
          isDisabled={isDisabled}
        >
          <Row>
            <CardHeading>
              {label}
            </CardHeading>
            <RadioButton
              color={Colors.pidzDarkBlue}
              isSelected={isSelected}
            />
          </Row>
          {
            description && (
              <SmallText>
                {description}
              </SmallText>
            )
          }
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

export default CompetenceCard;
