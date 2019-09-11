import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
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

class CompetenceCard extends React.PureComponent {
  handleChange = () => {
    const {
      handleChange,
      level,
    } = this.props;

    handleChange(level);
  };

  render() {
    const {
      isSelected,
      description,
      label,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.handleChange}>
        <Card isSelected={isSelected}>
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
