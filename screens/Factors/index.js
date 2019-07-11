import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setFreelancerCompetence } from '../../actions/formActions';
import Button from '../../components/Button';
import factors from './factors';
import SelectableFactorCards from '../../components/SelectableFactorCards';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.background};
  height: 100%;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
`;

const initialFactors = factors.map(factor => ({
  name: factor,
  relevant: false,
  level: null,
}));

class Factors extends React.PureComponent {
  render() {
    const {
      subjectName,
    } = this.props;

    return (
      <Wrapper>
        <Formik
          initialValues={{ factors: initialFactors }}
          onSubmit={(values) => {
            setFreelancerCompetence(values.factors);
          }}
        >
          {props => (
            <FullHeightView>
              <BodyText>{`Hoe presteert ${subjectName} op de onderstaande competenties?`}</BodyText>
              <SelectableFactorCards
                onChange={value => props.setFieldValue('factors', value)}
                name="factors"
                values={props.values.factors}
              />
              <Button
                onPress={props.handleSubmit}
                title="Volgende"
              />
            </FullHeightView>
          )}
        </Formik>
      </Wrapper>
    );
  }
}

Factors.navigationOptions = {
  header: <Header>Feedback</Header>,
};

Factors.propTypes = {
  // navigation: PropTypes.shape().isRequired,
  subjectName: PropTypes.string,
};

Factors.defaultProps = {
  subjectName: null,
};

const mapStateToProps = state => ({
  subjectName: state.form.subject.name,
});

const mapDispatchToProps = dispatch => ({
  setFreelancerCompetence: values => dispatch(setFreelancerCompetence(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Factors);
