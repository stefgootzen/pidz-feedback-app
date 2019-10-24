import styled from 'styled-components';
import {
  KeyboardAvoidingView, Picker, Text, TextInput, View, ImageBackground, Dimensions
} from 'react-native';
import { Button as NativeButton } from 'react-native-elements';
import { Colors, Spacing, Typography } from '../../styles';

export const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  ${Spacing.contentPadding};
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledImageBackground = styled(ImageBackground)`
  position: absolute;
  left: 0;
  top: 0;
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  background-color: ${Colors.pidzLightBlue};
`;

export const StyledTextInput = styled(TextInput)`
  padding: ${Spacing.smallest}px;
`;

export const StyledPicker = styled(Picker)`
  width: 100%;
  height: 30px;
`;

export const ErrorText = styled(Text)`
  color: ${Colors.pidzRed};
`;

export const FatBodyText = styled(Text)`
  ${Typography.inputLabel};
  color: ${Colors.pidzDarkBlue};
  margin-top: ${Spacing.small};
`;

export const StyledView = styled(View)`
  padding: ${Spacing.small}px;
  border-radius: 5px;
  background-color: white;
  display: flex;
`;

export const Heading = styled(Text)`
  ${Typography.headerText};
  color: ${Colors.pidzDarkBlue};
`;

export const SubHeading = styled(Text)`
  ${Typography.headingText};
  font-weight: bold;
  margin-bottom: ${Spacing.small};
  color: ${Colors.pidzDarkBlue};
`;

export const StyledButton = styled(NativeButton).attrs({
  disabledStyle: {
    opacity: 0.5,
  },
  buttonStyle: {
    backgroundColor: Colors.pidzDarkBlue,
  },
  containerStyle: {
    marginTop: Spacing.small,
  },
  textStyle: {
    color: 'white',
  },
})``;
