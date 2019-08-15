import { Button as NativeButton } from 'react-native-elements/src/index';
import styled from 'styled-components';
import { Colors, Spacing } from '../../styles';

const Button = styled(NativeButton).attrs({
  containerStyle: {
    marginTop: 'auto',
    marginBottom: Spacing.small,
  },
  buttonStyle: {
    backgroundColor: Colors.pidzDarkBlue,
  },
  textStyle: {
    color: 'white',
  },
})``;

export default Button;
