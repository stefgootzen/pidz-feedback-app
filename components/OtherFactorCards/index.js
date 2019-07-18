import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'formik';
import styled from 'styled-components';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';
import { Colors, Spacing, Typography } from '../../styles';
import SelectableSmileys from '../SelectableSmileys';
import { btnGroupBoolToYesNo, btnGroupYesNoToBool } from '../../utils/btnGroupYesNoToBool';
import SecondaryButton from '../SecondaryButton';

const FlexRow = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Card = styled(FlexRow)`
  background-color: white;
  padding: ${Spacing.small}px;
  margin-bottom: ${Spacing.small}px;
  border-radius: 5px;
  display: flex;
`;

const FatBodyText = styled(Text)`
  ${Typography.fatBodyText};
`;

const BodyText = styled(Text)`
  ${Typography.bodyText};
  margin-bottom: 2px;
`;

const OneThird = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const TwoThird = styled(View)`
  flex: 2;
  justify-content: center;
  padding-left:10px;
  opacity: ${props => (props.disabled ? 0.2 : 1)}
`;

const StyledTextInput = styled.TextInput`
  padding: ${Spacing.small}px;
  border-radius: 3px;
  flex: 1;
`;

class OtherFactorCards extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newFactor: '',
      idCounter: 0,
    };
  }

  handleLevelChange = (id, level) => {
    const {
      onChange,
      values,
    } = this.props;


    // Extract the right object out of the values array
    const value = values.find(value => value.id === id);

    value.level = level;

    onChange(values);
  };

  handleTextChange = (name) => {
    this.setState({
      newFactor: name,
    });
  };

  addNewFactor = () => {
    const {
      values,
      onChange,
    } = this.props;

    const {
      newFactor,
      idCounter,
    } = this.state;

    if (newFactor === '') {
      return;
    }
    // Extract the right object out of the values array
    values.push({
      id: idCounter,
      name: newFactor,
      level: null,
    });

    this.setState(prevState => ({ //eslint-disable-line
      idCounter: prevState.idCounter += 1, //eslint-disable-line
    }));

    onChange(values);
  };

  removeFactor = (id) => {
    const {
      values,
      onChange,
    } = this.props;

    const newValues = values.filter(value => value.id !== id);

    onChange(newValues);
  };

  render() {
    const {
      values,
    } = this.props;

    const {
      newFactor,
    } = this.state;

    return (
      <View>
        <FatBodyText>
          Anders
        </FatBodyText>
        <FlexRow>
          <StyledTextInput
            onChangeText={value => this.handleTextChange(value)}
            placeholder="Competentie"
            value={newFactor}
            underlineColorAndroid={Colors.darkGrey}
          />
          <SecondaryButton
            onPress={this.addNewFactor}
            title="Toevoegen"
          />
        </FlexRow>

        {
        values.map(factor => (
          <Card key={factor.id}>
            <TwoThird>
              <Text>{factor.name}</Text>
            </TwoThird>
            <OneThird>
              <SelectableSmileys
                handleChange={value => this.handleLevelChange(factor.id, value)}
                currentLevel={factor.level}
              />
              <TouchableWithoutFeedback onPress={() => this.removeFactor(factor.id)}>
                <FontAwesomeIcon
                  style={{
                    marginLeft: 12,
                  }}
                  size={20}
                  icon="trash"
                />
              </TouchableWithoutFeedback>
            </OneThird>

          </Card>
        ))
      }
      </View>
    );
  }
}

export default connect(OtherFactorCards);
