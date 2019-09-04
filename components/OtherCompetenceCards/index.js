import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { connect } from 'formik';
import styled from 'styled-components';
import { Colors, Spacing, Typography } from '../../styles';
import RadioTags from '../RadioTags';
import SecondaryButton from '../SecondaryButton';

const FlexRow = styled(View)`
  display: flex;
  flex-direction: row;
`;

const SpaceBetween = styled(FlexRow)`
  justify-content: space-between;
`;

const FatBodyText = styled(Text)`
  ${Typography.fatBodyText};
`;

const StyledTextInput = styled.TextInput`
  padding: ${Spacing.small}px;
  border-radius: 3px;
  flex: 1;
`;

const FatText = styled.Text`
  ${Typography.fatBodyText};
`;

class OtherCompetenceCards extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newCompetence: '',
      idCounter: 0,
      error: null,
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
      newCompetence: name,
    });
  };

  addNewCompetence = () => {
    const {
      values,
      onChange,
    } = this.props;

    const {
      newCompetence,
      idCounter,
    } = this.state;

    if (newCompetence === '') {
      return;
    }

    const valueExistsAlready = values.find(value => value.name === newCompetence);
    if (valueExistsAlready) {
      this.setState({
        error: 'Deze competentie heb je al aangemaakt',
      });
      return;
    }

    // Extract the right object out of the values array
    values.push({
      id: idCounter,
      name: newCompetence,
      level: null,
    });

    this.setState(prevState => ({ //eslint-disable-line
      idCounter: prevState.idCounter += 1, //eslint-disable-line
      newCompetence: '',
      error: null,
    }));

    onChange(values);
  };

  removeCompetence = (id) => {
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
      error,
      newCompetence,
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
            value={newCompetence}
            underlineColorAndroid={Colors.darkGrey}
          />
          <SecondaryButton
            onPress={this.addNewCompetence}
            title="Toevoegen"
          />
        </FlexRow>
        {error && <Text>{error}</Text>}
        {
          values.map(competence => (
            <React.Fragment key={competence.id}>
              <SpaceBetween>
                <FatText>{competence.name}</FatText>
                <TouchableWithoutFeedback onPress={() => this.removeCompetence(competence.id)}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: 12,
                    }}
                    size={20}
                    icon="trash"
                  />
                </TouchableWithoutFeedback>
              </SpaceBetween>

              <RadioTags
                onChange={(name, value) => this.handleLevelChange(competence.id, value)}
                value={competence.level}
                values={[0, 1, 2]}
                labels={['Slecht', 'Gemiddeld', 'Goed']}
                name={competence.name}
              />
            </React.Fragment>
          ))
        }
      </View>
    );
  }
}

export default connect(OtherCompetenceCards);
