import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  KeyboardAvoidingView, Picker, ScrollView, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Header from '../../components/Header';
import { Colors, Spacing, Typography } from '../../styles';
import { setJwt } from '../../actions/jwtActions';
import { setDepartment } from '../../actions/formActions';
import Button from '../../components/Button';
import StyledTextInput from '../../components/StyledTextInput';
import axiosInstance, { globalErrorHandler, setAuthorizationHeader } from '../../utils/axios';

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  ${Spacing.sectionPadding};
  height: 100%;
  justify-content: space-between; 
  background-color: ${Colors.pidzBackground};
`;

const ButtonWrapper = styled.View`
  padding-top: 10px;
`;

const StyledPicker = styled.Picker`
  width: 100%;
  height: 30px;
`;

const ThinBodyText = styled.Text`
  ${Typography.ThinBodyText};
`;


class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      organisations: [],
      departments: [],
      error: null,
    };
  }

  componentDidMount() {
    axiosInstance.get('/organisations')
      .then(({ data: organisations }) => {
        this.setState({
          organisations,
        });
      })
      .catch(globalErrorHandler);
  }

  handleOrganisationChange = async (value) => {
    try {
      const {
        data: { Departments: departments },
      } = await axiosInstance.get(`/organisations/${value}`);

      this.setState({
        departments,
      });
    } catch (error) {
      globalErrorHandler(error);
    }
  };

  render() {
    const {
      departments,
      organisations,
      error,
    } = this.state;

    return (
      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={async (values) => {
          const {
            setDepartment,
            setJwt,
            navigation,
          } = this.props;

          const {
            password,
            department: departmentId,
          } = values;

          const body = {
            password,
            departmentId,
          };

          try {
            const {
              data: {
                jwt,
              },
            } = await axiosInstance.post('/auth/signin', body);

            this.setState({
              error: null,
            });

            await setDepartment(departmentId);
            await setJwt(jwt);
            setAuthorizationHeader(jwt);
            navigation.navigate('Selection');
          } catch (error) {
            this.setState({
              error: error.message,
            });
          }
        }}
      >
        {props => (
          <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
            <ScrollView>
              <ThinBodyText>Organisatie</ThinBodyText>
              <StyledPicker
                selectedValue={props.values.organisation}
                onValueChange={((value) => {
                  this.handleOrganisationChange(value);
                  props.setFieldValue('organisation', value);
                })}
              >
                {
                  organisations.map(organisation => (
                    <Picker.Item
                      key={organisation.id}
                      label={organisation.name}
                      value={organisation.id}
                    />
                  ))
                }
              </StyledPicker>

              <ThinBodyText>Afdeling</ThinBodyText>
              <StyledPicker
                name="department"
                selectedValue={props.values.department}
                onValueChange={((value) => {
                  props.setFieldValue('department', value);
                })}
              >
                {
                  departments.map(department => (
                    <Picker.Item
                      key={department.id}
                      label={department.name}
                      value={department.id}
                    />
                  ))
                }
              </StyledPicker>

              <ThinBodyText>Wachtwoord</ThinBodyText>
              <StyledTextInput
                autoCompleteType="password"
                secureTextEntry
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                underlineColorAndroid={Colors.darkGrey}
              />
              { error && (<Text>{ error }</Text>) }
            </ScrollView>
            <ButtonWrapper>
              <Button
                disabled={props.values.password.length === 0}
                onPress={props.handleSubmit}
                title="Volgende"
              />
            </ButtonWrapper>
          </StyledKeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

Login.navigationOptions = {
  header: <Header>Login</Header>,
};

Login.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
  setJwt: values => dispatch(setJwt(values)),
  setDepartment: values => dispatch(setDepartment(values)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
