import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import Header from '../../components/Header';
import employees from './employees.json';
import UserCard from '../../components/UserCard';
import { Colors, Spacing } from '../../styles';

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

const Selection = ({ navigation }) => (
  <Wrapper>
    <FlatList
      data={employees}
      keyExtractor={item => item.index.toString()}
      ItemSeparatorComponent={() => <FlatListItemSeperator />}
      renderItem={({ item }) => (
        <TouchableHighlight onPress={() => navigation.navigate('Feedback')}>
          <UserCard
            picture={item.picture}
            name={item.name}
          />
        </TouchableHighlight>
      )}
    />
  </Wrapper>
);

Selection.navigationOptions = {
  header: <Header>Selection</Header>,
};

Selection.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Selection;
