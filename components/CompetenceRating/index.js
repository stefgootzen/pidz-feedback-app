import React from 'react';
import { View } from 'react-native';
import { connect } from 'formik';
import CompetenceCard from './CompetenceCard';

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
      labels,
      values,
      isDisabled,
    } = this.props;

    return (
      <View>
        {
          labels.map((label, index) => (
            <CompetenceCard
              key={label}
              level={values[index]}
              isSelected={selectedLevel === values[index]}
              isDisabled={isDisabled}
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
