import { Button as NativeButton } from 'react-native-elements/src/index';
import styled from 'styled-components';
import { Colors, Typography } from '../../styles';

const SecondaryButton = styled(NativeButton).attrs({
  containerStyle: {

  },
  buttonStyle: {
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: Colors.baseText,
    fontSize: Typography.smallFontSize,
  },
})``;

export default SecondaryButton;
