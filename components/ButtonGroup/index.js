import styled from 'styled-components';
import { ButtonGroup as ButtonGroupElement } from 'react-native-elements';
import { Colors } from '../../styles';

const ButtonGroup = styled(ButtonGroupElement).attrs({
  buttonStyle: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: Colors.pidzDarkBlue,
  },
  selectedButtonStyle: {
    backgroundColor: Colors.pidzDarkBlue,
  },
  selectedTextStyle: {
    color: 'white',
  },
  containerStyle: {
    marginLeft: 0,
    marginRight: 0,
  },
})``;

export default ButtonGroup;
