import React from 'react';
import { View } from 'react-native';
import { connect } from 'formik';
import CompetenceCard from './CompetenceCard';

const values = [0, 1, 2, 'ignore'];
const labels = ['Heeft veel verbetering nodig', 'Heeft verbetering nodig', 'Heeft geen verbetering nodig', 'Niet van toepassing'];

class SelectableCards extends React.PureComponent {
  handleChange = (value) => {
    const {
      name,
      formik: { setFieldValue },
    } = this.props;

    setFieldValue(name, value);
  };

  render() {
    const {
      selectedLevel,
    } = this.props;

    let levelToCompare;
    if (selectedLevel === undefined) {
      levelToCompare = 'ignore';
    } else {
      levelToCompare = selectedLevel;
    }

    return (
      <View>
        {
          labels.map((label, index) => (
            <CompetenceCard
              key={label}
              level={values[index]}
              isSelected={levelToCompare === values[index]}
              label={label}
              handleChange={this.handleChange}
            />
          ))
        }
      </View>
    );
  }
}

export default connect(SelectableCards);
