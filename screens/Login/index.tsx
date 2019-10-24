import React from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { ThunkDispatch } from 'redux-thunk'; //eslint-disable-line
import {
  ErrorText, FatBodyText, Heading, StyledButton, StyledKeyboardAvoidingView, StyledPicker,
  StyledTextInput, StyledView, SubHeading, StyledImageBackground,
} from './styles';
import { Colors } from '../../styles';
import { setJwt } from '../../actions/jwtActions';
import { setDepartment } from '../../actions/formActions';
import axiosInstance, { globalErrorHandler, setAuthorizationHeader } from '../../utils/axios';
import navigateWithOnboarding from '../../utils/navigateWithOnboarding';
import backgroundImage from '../../assets/pidz_login_background.png';

interface Organisation {
  id: number,
  name: string,
}

interface Department {
  id: number,
  name: string,
}

interface State {
  organisations: [],
  departments: [],
  error: null,
}

interface OwnProps {
  setDepartment(department: any): any,
  setJwt(jwt: string): any,
  navigation: any,
}

interface DispatchProps {
  setDepartment: (values: Department) => void,
  setJwt: (values: string) => void,
}

type Props = OwnProps & DispatchProps;

interface FormValues {
  department: Department | null,
  password: string,
  organisation: Organisation | null,
}

class Login extends React.PureComponent<Props, State> {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props: Props) {
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

  handleSubmit = (values: FormValues) => {
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

  handleOrganisationChange = async (value: number) => {
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
          department: null,
          organisation: null,
        }}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <StyledImageBackground
            source={backgroundImage}
            style={{

            }}
          >
            <StyledKeyboardAvoidingView behavior="height">
              <StyledView>
                <Heading>Welkom,</Heading>
                <SubHeading>Log in om door te gaan</SubHeading>
                <FatBodyText>Organisatie</FatBodyText>
                <StyledPicker
                  selectedValue={props.values.organisation}
                  onValueChange={((value: number) => {
                    this.handleOrganisationChange(value);
                    props.setFieldValue('organisation', value);
                  })}
                >
                  {
                    organisations.map((organisation: Organisation) => (
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
                {/*
                  // @ts-ignore */}
                <StyledPicker
                  name="department"
                  selectedValue={props.values.department}
                  onValueChange={((value: number) => {
                    props.setFieldValue('department', value);
                  })}
                >
                  {
                    departments.map((department: Department) => (
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
            </StyledKeyboardAvoidingView>
          </StyledImageBackground>
        )}
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
  setJwt: (values: string) => dispatch(setJwt(values)),
  setDepartment: (values: Department) => dispatch(setDepartment(values)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
