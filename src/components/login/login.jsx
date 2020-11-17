import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useLocation, useParams } from 'react-router';
import { ultraUnsafeLogin } from '../../api/login';
import Copyright from '../copyright';
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import {
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cssLabel: {
    color: `white !important`,
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
      boxShadow: "0 0 0 100px transparent inset !important",
    },
    boxShadow: "0 0 0 100px transparent inset !important"

  },

  labelFocused: {
    color: "#ffffff",
  },

  cssFocused: {
    boxShadow: "0 0 0 100px transparent inset !important"
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: `white !important`,
    boxShadow: "0 0 0 100px transparent inset !important"
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
    WebkitBoxShadow: "0 0 0 100px transparent inset !important"
  }
}));

export default function SignIn({ user,setUser, redirectPrefix }) {
  useLocation();
  const id = useParams().id;
  const redirectUrl = redirectPrefix ? `${redirectPrefix}/${id}` : undefined;
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [viewPassword = false, setViewPassword] = useState();
  useEffect(() => {
    if(user) {
      if(redirectUrl) {
        window.location.assign(redirectUrl);
      } else {
        window.location.assign("/");
      }
    }
  });
  const handleSignInPress = async() => {
    try {
      let user = await ultraUnsafeLogin({email, password});
      setUser(user);
      console.log("ok")
      if(redirectUrl) {
        console.log(redirectUrl);
        window.location.assign(redirectUrl);
      } else {
        window.location.assign("/");
      }
    } catch(error) {
      console.log(error);
      console.log("TODO: DISPLAY ERROR");
    }
  }
  return (
    <Container  maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesion
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={handleSignInPress}>
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            validators={["required", "isEmail"]}
            errorMessages={["Este campo es necesario.", "Correo invalido."]}
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
              }              
            }}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={viewPassword ? "text" : "password"}
            id="password"
            onChange={(event) => setPassword(event.target.value)}
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
                    onClick={() => setViewPassword(!viewPassword)}
                    edge="end"
                  >
                    {viewPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),              
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignInPress}
          >
            Iniciar Sesión
          </Button>
        </ValidatorForm>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}