import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Colors, Spacing, Typography } from '../../styles';
import { setFreelancerCompetences } from '../../actions/formActions';
import Button from '../../components/Button';
import RadioTags from '../../components/RadioTags';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import Header from '../../components/Header';
import SignoutIcon from '../../components/SignoutIcon';

const StyledView = styled.View`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  height: 100%;
  justify-content: space-between; 
  background-color: ${Colors.pidzBackground};
`;

const ButtonWrapper = styled.View`
  padding-top: 10px;
`;

const InputLabel = styled.Text`
  ${Typography.inputLabel};
  margin-bottom: ${Spacing.base};
`;

const FatText = styled.Text`
  ${Typography.inputLabel};
`;

class OldFreelancerCompetences extends React.PureComponent {
  state = {
    initialFreelancerCompetences: [],
  };

  componentDidMount() {
    const {
      freelancerId,
    } = this.props;

    axiosInstance.get(`/freelancerCompetences?freelancerId=${freelancerId}`)
      .then(({ data: freelancerCompetences }) => {
        const initialFreelancerCompetences = freelancerCompetences.map(freelancerCompetence => ({
          id: freelancerCompetence.id,
          name: freelancerCompetence.name,
          level: null,
        }));

        this.setState({
          initialFreelancerCompetences,
        });
      })
      .catch(globalErrorHandler);
  }

  render() {
    const {
      freelancerName,
      navigation,
      setFreelancerCompetences,
    } = this.props;

    const {
      initialFreelancerCompetences,
    } = this.state;

    if (initialFreelancerCompetences.length === 0) {
      return (
        <StyledView>
          <ActivityIndicator />
        </StyledView>
      );
    }

    return (
      <Formik
        initialValues={{
          freelancerCompetences: initialFreelancerCompetences,
        }}
        onSubmit={(values) => {
          const cleanedFreelancerCompetence = values.freelancerCompetences
            .map((freelancerCompetence) => {
              if (freelancerCompetence.level === 'ignore') {
                freelancerCompetence.level = null; // eslint-disable-line
              }
              return freelancerCompetence;
            });

          setFreelancerCompetences(cleanedFreelancerCompetence);

          navigateWithOnboarding(navigation, 'Closing');
        }}
      >
        {props => (
          <StyledView>
            <ScrollView>
              <InputLabel>{`Hoe presteert ${freelancerName} op de onderstaande competenties?`}</InputLabel>
              {
                props.values.freelancerCompetences.map(freelancerCompetence => (
                  <React.Fragment key={freelancerCompetence.id}>
                    <FatText>{freelancerCompetence.name}</FatText>
                    <RadioTags
                      onChange={(name, value) => {
                        const freelancerCompetencesCopy = JSON.parse(
                          JSON.stringify(props.values.freelancerCompetences),
                        );
                        const relevantFreelancerCompetence = freelancerCompetencesCopy
                          .find(freelancerCompetence => freelancerCompetence.name === name);
                        relevantFreelancerCompetence.level = value;
                        return props.setFieldValue('freelancerCompetences', freelancerCompetencesCopy);
                      }}
                      value={freelancerCompetence.level}
                      values={['ignore', 0, 1, 2]}
                      labels={['n.v.t.', 'Heeft veel verbetering nodig', 'Heeft verbetering nodig', 'Heeft geen verbetering nodig']}
                      name={freelancerCompetence.name}
                    />
                  </React.Fragment>
                ))
              }
            </ScrollView>
            <ButtonWrapper>
              <Button
                onPress={props.handleSubmit}
                title="Volgende"
              />
            </ButtonWrapper>
          </StyledView>

        )}
      </Formik>
    );
  }
}

OldFreelancerCompetences.navigationOptions = {
  header: (
    <Header
      title="Freelancer competenties"
      icon={<SignoutIcon />}
    />
  ),
};

OldFreelancerCompetences.propTypes = {
  navigation: PropTypes.shape().isRequired,
  freelancerName: PropTypes.string,
};

OldFreelancerCompetences.defaultProps = {
  freelancerName: null,
};

const mapStateToProps = state => ({
  freelancerName: state.form.freelancer.name,
  freelancerId: state.form.freelancer.id,
});

const mapDispatchToProps = dispatch => ({
  setFreelancerCompetences: values => dispatch(setFreelancerCompetences(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OldFreelancerCompetences);
