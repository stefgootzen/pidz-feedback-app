import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { setDepartmentCompetences } from '../../actions/formActions';
import CompetenceReview from '../../components/CompetenceReview';
import Header from '../../components/Header';
import SignoutIcon from '../../components/SignoutIcon';

const DepartmentCompetences = (props) => {
  const {
    departmentId,
    setDepartmentCompetences,
  } = props;

  return (
    <CompetenceReview
      setCompetenceAction={setDepartmentCompetences}
      apiPath={`/departmentCompetences?departmentId=${departmentId}`}
      nextStep="FreelancerCompetences"
    />
  );
};

DepartmentCompetences.navigationOptions = {
  header: (
    <Header
      title="Afdelings competenties"
      icon={<SignoutIcon />}
    />
  ),
};

const mapStateToProps = state => ({
  departmentId: state.form.department.id,
});

const mapDispatchToProps = dispatch => ({
  setDepartmentCompetences: values => dispatch(setDepartmentCompetences(values)),
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentCompetences));
