import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../../styles';

const Wrapper = styled.View`
  width: 95%;
  align-self: center;
  padding: 20px;
  background-color: ${Colors.pidzRed};
  color: white;
  position: absolute;
  bottom: 10px;
`;

const WhiteText = styled.Text`
  color: white;
`;

const Header = styled(WhiteText)`
  font-weight: bold;
`;

const ErrorShower = (props) => {
  const {
    errorMessage,
  } = props;

  if (!errorMessage) {
    return null;
  }

  return (
    <Wrapper>
      <Header>Error</Header>
      <WhiteText>{errorMessage}</WhiteText>
    </Wrapper>
  );
};

ErrorShower.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorShower.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  errorMessage: state.error.message,
});

export default connect(
  mapStateToProps,
  null,
)(ErrorShower);
