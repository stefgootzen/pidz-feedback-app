import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';

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

const Closing = ({ form, navigation }) => {
  console.log(form);
  return (
    <Wrapper>
      <FullHeightView>
        <BodyText>Bedankt voor het invullen van de review!</BodyText>
        <Button
          onPress={() => navigation.navigate('Selection')}
          title="Volgende"
        />
      </FullHeightView>
    </Wrapper>
  );
}

Closing.navigationOptions = {
  header: <Header>Bedankt</Header>,
};

Closing.propTypes = {
  navigation: PropTypes.shape().isRequired,
  form: PropTypes.shape(),
};

Closing.defaultProps = {
  form: null,
};

const mapStateToProps = state => ({
  form: state.form,
});


export default connect(
  mapStateToProps,
  null,
)(Closing);
