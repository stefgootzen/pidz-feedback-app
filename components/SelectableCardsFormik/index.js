import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { Colors, Spacing } from '../../styles';

const Card = styled.View`
  background-color: white;
  border: 1px;
  opacity: ${props => (props.selected ? 1 : 0.6)};
  border-color: ${props => (props.selected ? Colors.pidzDarkBlue : 'white')};
  padding: ${Spacing.small}px;
  margin-bottom: ${Spacing.small}px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const Line = styled.View`
  border-bottom-color: ${Colors.pidzDarkBlue};
  border-bottom-width: 1px;
`;

const CenteredText = styled.Text`
  text-align: center;
`;

class SelectableCardsFormik extends React.PureComponent {
  handleChange = (value) => {
    const {
      name,
      formik: { setFieldValue },
    } = this.props;

    setFieldValue(name, value);
  };

  render() {
    const {
      items: { levels },
      value,
    } = this.props;
    return (
      <View>
        {
          levels.map(({ level, description }, index) => (
            <TouchableWithoutFeedback
              onPress={() => this.handleChange(index)}
              key={description}
            >
              <Card selected={value === index}>
                <Text>
                  {level}
                </Text>
                <Line />
                <CenteredText>
                  {description}
                </CenteredText>
              </Card>
            </TouchableWithoutFeedback>
          ))
        }
      </View>
    );
  }
}

export default connect(SelectableCardsFormik);
