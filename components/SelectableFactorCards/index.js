import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { Spacing, Typography } from '../../styles';
import ButtonGroup from '../ButtonGroup';
import SelectableSmileys from '../SelectableSmileys';
import { btnGroupBoolToYesNo, btnGroupYesNoToBool } from '../../utils/btnGroupYesNoToBool';

const FlexRow = styled(View)`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`;

const Card = styled(FlexRow)`
  background-color: white;
  padding: ${Spacing.small}px;
  margin-bottom: ${Spacing.small}px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const BodyText = styled(Text)`
  ${Typography.bodyText};
  margin-bottom: 2px;
`;

const OneThird = styled(View)`
  flex: 1;
  justify-content: center;
`;

const TwoThird = styled(View)`
  flex: 2;
  justify-content: center;
  padding-left:10px;
  opacity: ${props => (props.disabled ? 0 : 1)}
`;

const FlexWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const FatBodyText = styled.Text`
  ${Typography.fatBodyText};
`;

class SelectableFactorCards extends React.PureComponent {
  handleButtonGroupChange = (factor, relevance) => {
    const {
      onChange,
      values,
    } = this.props;

    // Convert relevance number to bool
    const isRelevant = btnGroupYesNoToBool(relevance);

    // Extract the right object out of the values array
    const value = values.find(value => value.name === factor);

    value.relevant = isRelevant;

    // If it isn't relevant anyomre, level should be null
    if (!isRelevant) {
      value.level = null;
    }

    onChange(values);
  };

  handleLevelChange = (factor, level) => {
    const {
      onChange,
      values,
    } = this.props;


    // Extract the right object out of the values array
    const value = values.find(value => value.name === factor);

    value.level = level;

    onChange(values);
  };

  render() {
    const {
      values,
    } = this.props;

    return (
      <View>
        <FlexRow>
          <OneThird>
            <FatBodyText>Relevant</FatBodyText>
          </OneThird>
          <TwoThird>
            <FatBodyText>Beoordeling</FatBodyText>
          </TwoThird>
        </FlexRow>
        {
          values.map(factor => (
            <Card key={factor.name}>
              <BodyText>{factor.name}</BodyText>
              <FlexWrapper>
                <OneThird>
                  <ButtonGroup
                    onPress={value => this.handleButtonGroupChange(factor.name, value)}
                    selectedIndex={btnGroupBoolToYesNo(factor.relevant)}
                    buttons={['Ja', 'Nee']}
                  />
                </OneThird>
                <TwoThird disabled={!factor.relevant}>
                  <SelectableSmileys
                    isDisabled={!factor.relevant}
                    handleChange={value => this.handleLevelChange(factor.name, value)}
                    currentLevel={factor.level}
                  />
                </TwoThird>
              </FlexWrapper>
            </Card>
          ))
        }
      </View>
    );
  }
}

export default connect(SelectableFactorCards);
