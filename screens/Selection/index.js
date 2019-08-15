import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { setSubject } from '../../actions/formActions';
import Header from '../../components/Header';
import employees from './employees.json';
import UserCard from '../../components/UserCard';
import { Colors, Spacing, Typography } from '../../styles';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const FlatListItemSeperator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.pidzBackground};
`;

const HeadingText = styled.Text`
  ${Typography.headingText};
  margin-bottom: ${Spacing.base};
`;

class Selection extends React.Component {
  handleClick = (values) => {
    const {
      setSubject,
      navigation,
    } = this.props;

    setSubject(values);
    navigation.navigate('Suitability');
  };

  render() {
    return (
      <Wrapper>
        <HeadingText>Over wie wil je vandaag iets vertellen?</HeadingText>
        <FlatList
          data={employees}
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
  header: <Header>Hallo Guus!</Header>,
};

const mapDispatchToProps = dispatch => ({
  setSubject: subject => dispatch(setSubject(subject)),
});

Selection.propTypes = {
  navigation: PropTypes.shape().isRequired,
  setSubject: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Selection);
