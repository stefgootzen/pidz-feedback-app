import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { setSubject } from '../../actions/formActions';
import Header from '../../components/Header';
import employees from './employees.json';
import UserCard from '../../components/UserCard';
import { Colors, Spacing, Typography } from '../../styles';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.background};
  height: 100%;
`;

const FlatListItemSeperator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.background};
`;

const FlatListHeading = styled.Text`
  ${Typography.bodyText};
  margin-bottom: 5px;
  margin-top: 15px;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
`;

class Selection extends React.Component {
  handleClick = (values) => {
    const {
      setSubject,
      navigation,
    } = this.props;

    setSubject(values);
    navigation.navigate('Feedback');
  };

  render() {
    return (
      <Wrapper>
        <BodyText>Hallo Guus, over wie wil je vandaag iets vertellen?</BodyText>
        <FlatListHeading>PIDZers werkzaam bij SWZ</FlatListHeading>
        <FlatList
          data={employees}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <FlatListItemSeperator />}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.handleClick(item)}>
              <UserCard
                picture={item.picture}
                name={item.name}
              />
            </TouchableHighlight>
          )}
        />
      </Wrapper>
    );
  }
}

Selection.navigationOptions = {
  header: <Header>Selection</Header>,
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
