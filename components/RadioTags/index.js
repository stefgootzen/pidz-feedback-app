import React from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import { Spacing, Colors } from '../../styles';
import RadioButton from '../RadioButton';

const FlexWrapper = styled.View`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
`;

const Block = styled.View`
  flex-grow: 0;
  flex-basis: 49%;
  padding: ${Spacing.small}px;
  margin-bottom: 2%;
  align-items: center;
  flex-direction: row;
  opacity: ${props => (props.isSelected ? 1 : 0.8)};
  border: 1px;
  border-color: ${props => (props.isSelected ? 'rgba(137, 210, 246, 0.5)' : Colors.darkGrey)};
  border-radius: 5px;
  background-color: ${props => (props.isSelected ? 'rgba(137, 210, 246, 0.1)' : 'transparent')};  
`;

const Tag = styled.Text`
  color: ${props => (props.isSelected ? Colors.pidzLightBlue : 'black')};
  font-weight: ${props => (props.isSelected ? 'bold' : 'normal')};
  opacity: 0.8;
  margin-left: 10px;
`;

class RadioTags extends React.PureComponent {
  handleClick = (value) => {
    const {
      name,
      onChange,
    } = this.props;

    onChange(name, value);
  };

  render() {
    const {
      value,
      values,
      labels,
    } = this.props;

    const [initialValue] = values;

    let valueToCompare;
    if (value === null) {
      valueToCompare = initialValue;
    } else {
      valueToCompare = value;
    }

    return (
      <FlexWrapper>
        {
          values.map((currentValue, i) => {
            const isSelected = (valueToCompare === currentValue);

            return (
              <TouchableWithoutFeedback
                onPress={() => this.handleClick(currentValue)}
                key={currentValue}
              >
                <Block isSelected={isSelected}>
                  <RadioButton isSelected={isSelected} />
                  <Tag isSelected={isSelected}>
                    {labels[i]}
                  </Tag>
                </Block>
              </TouchableWithoutFeedback>
            );
          })
        }
      </FlexWrapper>
    );
  }
}

export default connect(RadioTags);
