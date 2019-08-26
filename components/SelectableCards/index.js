import React from 'react';
import { View } from 'react-native';
import { connect } from 'formik';
import SelectableCard from './SelectableCard';

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
      competence: { CompetenceLevels },
      selectedLevel,
    } = this.props;

    return (
      <View>
        {
          CompetenceLevels.map(competenceLevel => (
            <SelectableCard
              key={competenceLevel.description}
              level={competenceLevel.level}
              selectedLevel={selectedLevel}
              handleChange={this.handleChange}
              description={competenceLevel.description}
            />
          ))
        }
      </View>
    );
  }
}

export default connect(SelectableCards);
