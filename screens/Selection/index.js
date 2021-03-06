import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text, ActivityIndicator, FlatList, TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import { setFreelancer } from '../../actions/formActions';
import SignoutIcon from '../../components/SignoutIcon';
import Header from '../../components/Header';
import UserCard from '../../components/UserCard';
import { Colors, Spacing, Typography } from '../../styles';
import axiosInstance, { globalErrorHandler } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';

const Wrapper = styled.View`
  ${Spacing.contentPadding};
  ${Spacing.sectionTopPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const FlatListItemSeperator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.pidzBackground};
`;

const InputLabel = styled.Text`
  ${Typography.inputLabel};
  margin-bottom: ${Spacing.base};
`;

class Selection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      freelancers: [],
    };
  }

  componentDidMount() {
    axiosInstance.get('/freelancers')
      .then(({ data: freelancers }) => {
        this.setState({
          freelancers,
        });
      })
      .catch(globalErrorHandler);
  }

  handleClick = (values) => {
    const {
      setFreelancer,
      navigation,
    } = this.props;

    setFreelancer(values);
    navigateWithOnboarding(navigation, 'Suitability');
  };

  render() {
    const {
      freelancers,
    } = this.state;


    if (freelancers.length === 0) {
      return (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <InputLabel>Over wie wil je vandaag iets vertellen?</InputLabel>
        <FlatList
          data={freelancers}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <FlatListItemSeperator />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleClick(item)}>
              <UserCard
                picture={item.picture}
                name={item.name}
              />
            </TouchableOpacity>
          )}
        />
      </Wrapper>
    );
  }
}

Selection.navigationOptions = {
  header: (
    <Header
      title="Selectie"
      icon={<SignoutIcon />}
    />
  ),
};

const mapDispatchToProps = dispatch => ({
  setFreelancer: values => dispatch(setFreelancer(values)),
});

Selection.propTypes = {
  navigation: PropTypes.shape().isRequired,
  setFreelancer: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Selection);
