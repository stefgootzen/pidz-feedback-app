import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';

const Wrapper = styled.View`
  ${Spacing.sectionPadding};
  background-color: ${Colors.pidzBackground};
  height: 100%;
`;

const FullHeightView = styled.View`
  height: 100%;
`;

const BodyText = styled.Text`
  ${Typography.fatBodyText};
`;

const Closing = ({ navigation }) => {
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
};

Closing.navigationOptions = {
  header: <Header title="Bedankt" />,
};

Closing.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Closing;
