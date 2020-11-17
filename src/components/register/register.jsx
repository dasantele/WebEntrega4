import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "../../api/user";
import Copyright from "../copyright";
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  createMuiTheme,
  InputAdornment,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  ValidatorForm,
  TextValidator,
  ValidatorComponent,
} from "react-material-ui-form-validator";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const calendarTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cssLabel: {
    color: `white !important`,
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `white !important`,
      boxShadow: "0 0 0 100px transparent inset !important",
    },
    boxShadow: "0 0 0 100px transparent inset !important",
  },

  labelFocused: {
    color: "#ffffff",
  },

  error: {
    "&$cssFocused $notchedOutline": {
      borderColor: `red !important`,
      boxShadow: "0 0 0 100px transparent inset !important",
    },
    color: `red !important`,
  },
  errorDate: {
    color: `red !important`,
  },

  cssFocused: {
    boxShadow: "0 0 0 100px transparent inset !important",
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: `white`,
    boxShadow: "0 0 0 100px transparent inset",
  },

  divider: {
    height: 28,
    margin: 4,
  },

  iconButton: {
    padding: 10,
  },

  txtField: {
    boxShadow: "0 0 0 100px transparent inset !important",
    WebkitBoxShadow: "0 0 0 100px transparent inset !important",
  },
}));

function calculateAge(date) {
  let today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  let difMeses = today.getMonth() - date.getMonth();
  if (difMeses < 0 || (difMeses === 0 && today.getDate() < date.getDate()))
    age--;
  return age;
}

export default function Register({ user, setUser, redirectPrefix }) {
  useLocation();
  const id = useParams().id;
  const redirectUrl = redirectPrefix ? `${redirectPrefix}/${id}` : undefined;
  const classes = useStyles();
  useEffect(() => {
    if(user) {
      if(redirectUrl) {
        window.location.assign(redirectUrl);
      } else {
        window.location.assign("/");
      }
    }
  });

  class ValidatedDatePicker extends ValidatorComponent {
    renderValidatorComponent() {
      const {
        errorMessages,
        validators,
        requiredError,
        helperText,
        validatorListener,
        ...rest
      } = this.props;
      const { isValid } = this.state;
      return (
        <KeyboardDatePicker
          {...rest}
          error={!isValid}
          helperText={(!isValid && this.getErrorMessage()) || helperText}
        />
      );
    }
  }

  const logIn = (newUser) => {
    try {
      delete newUser.contrasenia;
      alert(newUser);
      setUser(newUser);
      if (redirectUrl) {
        console.log(redirectUrl);
        window.location.assign(redirectUrl);
      } else window.location.assign("/");
    } catch (error) {
      console.log(error);
    }
  }

  class Form extends React.Component {
    state = {
      data: {
        name: "",
        lastName: "",
        dir: "Cll 1 #1-1",
        email: "",
        password: "",
        passwordCheck: "",
        birthday: new Date("2003-06-06"),
      },
      show: {
        password: false,
        passwordCheck: false,
      },
    };

    componentDidMount() {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== this.state.data.password) return false;
        return true;
      });

      ValidatorForm.addValidationRule("isCorrectAge", (value) => {
        if (calculateAge(value) < 18) return false;
        return true;
      });
    }

    componentWillUnmount() {
      // remove rule when it is not needed
      ValidatorForm.removeValidationRule("isPasswordMatch");
      ValidatorForm.removeValidationRule("isCorrectAge");
    }

    handleClickShowPassword = (event) => {
      const { show } = this.state;
      show["password"] = !show.password;
      this.setState({ show });
    };

    handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    handleClickShowPasswordCheck = () => {
      const { show } = this.state;
      show["passwordCheck"] = !show.passwordCheck;
      this.setState({ show });
    };

    handleMouseDownPasswordCheck = (event) => {
      event.preventDefault();
    };

    handleChange = (event) => {
      const { data } = this.state;
      data[event.target.name] = event.target.value;
      this.setState({ data });
    };

    handleDateChange = (date) => {
      const { data } = this.state;
      data["birthday"] = date;
      this.setState({ data });
    };

    handleSubmit = async () => {
      let userData = this.state.data;
      userData.age = calculateAge(userData.birthday);
      delete userData.birthday;
      let user = await register(userData);
      user = user[0];
      logIn(user);
    };

    render() {
      return (
        <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            onChange={this.handleChange}
            validators={["required"]}
            errorMessages={["Este campo es necesario."]}
            value={this.state.data.name}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            name="lastName"
            label="Apellidos"
            onChange={this.handleChange}
            validators={["required"]}
            errorMessages={["Este campo es necesario."]}
            value={this.state.data.lastName}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dir"
            name="dir"
            label="Dirección"
            onChange={this.handleChange}
            validators={["required"]}
            errorMessages={["Este campo es necesario"]}
            value={this.state.data.dir}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Correo electrónico"
            onChange={this.handleChange}
            validators={["required", "isEmail"]}
            errorMessages={["Este campo es necesario.", "Correo invalido."]}
            value={this.state.data.email}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            onChange={this.handleChange}
            type={this.state.show.password ? "text" : "password"}
            validators={["required"]}
            errorMessages={["Este campo es necesario."]}
            value={this.state.data.password}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    edge="end"
                  >
                    {this.state.show.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <PasswordStrengthMeter
            margin="normal"
            fullWidth
            password={this.state.data.password}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="passwordCheck"
            name="passwordCheck"
            label="Confirmar contraseña"
            onChange={this.handleChange}
            type={this.state.show.passwordCheck ? "text" : "password"}
            validators={["isPasswordMatch", "required"]}
            errorMessages={[
              "La contraseña debe ser igual.",
              "Este campo es necesario.",
            ]}
            value={this.state.data.passwordCheck}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPasswordCheck}
                    onMouseDown={this.handleMouseDownPasswordCheck}
                    edge="end"
                  >
                    {this.state.show.passwordCheck ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ThemeProvider theme={calendarTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <span aria-label="Fecha de nacimiento">
              <ValidatedDatePicker
                margin="normal"
                required
                fullWidth
                id="birthdayp"
                label="Fecha de nacimiento"
                format="dd/MM/yyyy"
                value={this.state.data.birthday}
                onChange={this.handleDateChange}
                validators={["required", "isCorrectAge"]}
                errorMessages={[
                  "Este campo es necesario",
                  "Debe ser mayor de edad para registrarse",
                ]}
                InputAdornmentProps={{
                  position: "start",
                }}
              />
              </span>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrate
          </Button>
        </ValidatorForm>
      );
    }
  }
  return (
    <Container  maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        <Form />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
