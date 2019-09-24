import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { setFreelancerCompetences } from '../../actions/formActions';
import CompetenceReview from '../../components/CompetenceReview';
import Header from '../../components/Header';
import SignoutIcon from '../../components/SignoutIcon';

const FreelancerCompetences = (props) => {
  const {
    freelancerId,
    setFreelancerCompetences,
  } = props;

  return (
    <CompetenceReview
      setCompetenceAction={setFreelancerCompetences}
      apiPath={`/freelancerCompetences?freelancerId=${freelancerId}`}
      nextStep="Remarks"
    />
  );
};

FreelancerCompetences.navigationOptions = {
  header: (
    <Header
      title="ZZP'er competenties"
      icon={<SignoutIcon />}
    />
  ),
};

const mapStateToProps = state => ({
  freelancerId: state.form.department.id,
});

const mapDispatchToProps = dispatch => ({
  setFreelancerCompetences: values => dispatch(setFreelancerCompetences(values)),
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreelancerCompetences));
