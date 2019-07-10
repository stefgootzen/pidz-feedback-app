import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors, Spacing } from '../../styles';

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

class SelectableCardsFormik extends React.PureComponent {
  handleChange = (value) => {
    const {
      name,
      formik: { setFieldValue },
    } = this.props;

    setFieldValue(name, value);
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
                <View>
                  { this.renderRightSmiley(level)}
                </View>
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
