import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ImageBackground, KeyboardAvoidingView, Picker, Text,
} from 'react-native';
import { Button as NativeButton } from 'react-native-elements';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Colors, Spacing, Typography } from '../../styles';
import { setJwt } from '../../actions/jwtActions';
import { setDepartment } from '../../actions/formActions';
import axiosInstance, { globalErrorHandler, setAuthorizationHeader } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import backgroundImage from '../../assets/pidz_login_background.png';

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  ${Spacing.sectionPadding};
  height: 100%;
  justify-content: space-between; 
  background-color: ${Colors.pidzLightBlue};
`;

const StyledTextInput = styled.TextInput`
  padding: ${Spacing.smallest}px;
`;

const StyledPicker = styled.Picker`
  width: 100%;
  height: 30px;
`;

const ErrorText = styled.Text`
  color: ${Colors.pidzRed};
`;

const FatBodyText = styled.Text`
  ${Typography.inputLabel};
  color: ${Colors.pidzDarkBlue};
  margin-top: ${Spacing.small};
`;

const StyledView = styled.View`
  padding: ${Spacing.small}px;
  border-radius: 5px;
  background-color: white;
  display: flex;
`;

const Heading = styled.Text`
  ${Typography.headerText};
  color: ${Colors.pidzDarkBlue};
`;

const SubHeading = styled.Text`
  ${Typography.headingText};
  font-weight: bold;
  margin-bottom: ${Spacing.small};
  color: ${Colors.pidzDarkBlue};
`;

const StyledButton = styled(NativeButton).attrs({
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

  handleSubmit = (values) => {
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

    axiosInstance.post('/auth/signin', body)
      .then(({ data: { jwt } }) => {
        this.setState({
          error: null,
        });

        this.setState({
          error: null,
        });

        setDepartment(departmentId);
        setJwt(jwt);
        setAuthorizationHeader(jwt);
        navigateWithOnboarding(navigation, 'Selection');
      })
      .catch((error) => {
        this.setState({
          error: error.response.data.message,
        });
      });
  };

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
        onSubmit={this.handleSubmit}
      >
        {props => (
          <StyledKeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
            <ImageBackground source={backgroundImage} style={{ justifyContent: 'center', height: '100%' }}>
              <StyledView>
                <Heading>Welkom,</Heading>
                <SubHeading>Log in om door te gaan</SubHeading>
                <FatBodyText>Organisatie</FatBodyText>
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
                        color={Colors.pidzDarkBlue}
                        key={organisation.id}
                        label={organisation.name}
                        value={organisation.id}
                      />
                    ))
                  }
                </StyledPicker>

                <FatBodyText>Afdeling</FatBodyText>
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
                        color={Colors.pidzDarkBlue}
                        key={department.id}
                        label={department.name}
                        value={department.id}
                      />
                    ))
                  }
                </StyledPicker>

                <FatBodyText>Wachtwoord</FatBodyText>
                <StyledTextInput
                  autoCompleteType="password"
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  underlineColorAndroid={Colors.pidzDarkBlue}
                />
                {error && (<ErrorText>{error}</ErrorText>)}
                <StyledButton
                  disabled={props.values.password.length === 0}
                  onPress={props.handleSubmit}
                  title="Inloggen"
                />
              </StyledView>
            </ImageBackground>
          </StyledKeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

Login.navigationOptions = {
  header: null,
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
