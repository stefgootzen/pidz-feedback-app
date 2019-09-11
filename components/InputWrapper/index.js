import styled from 'styled-components';
import { Spacing } from '../../styles';

const InputWrapper = styled.View`
  margin-bottom: ${props => (props.moreMargin ? Spacing.large : Spacing.small)}
`;

export default InputWrapper;
