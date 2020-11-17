import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import face from "./fb.png";
import twitter from "./twt.png";
import instagram from "./ig.png";
import tumblr from "./tm.png";


const useStyles = makeStyles((theme) => ({
    root: {
    display: 'flex',
    backgroundColor: theme.palette.tertiary.main,
    },
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      display: 'flex',
      background: theme.palette.tertiary.main,
    },
    iconsWrapper: {
      height: 120,
    },
    icons: {
      display: 'flex',
    },
    icon: {
      width: 30,
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    list: {
      margin: 0,
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
    link: {
      color:"#FFFFFF",
    }
    
  }));
  
  const Footer = (props) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
    <Typography component="footer" className={styles.root}>
      <Container className={styles.container}>
         <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
          <Typography variant="h6" marked="left" gutterBottom>
              <strong>Mantente en contacto</strong> 
            </Typography>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={styles.iconsWrapper}
              spacing={3}
            >
              <Grid item className={styles.icons}>
                <a href="https://facebook.com/" className={styles.icon}>
                  <img src={face} alt="facebook"/>
                </a>
                <a href="https://twitter.com/" className={styles.icon} >
                  <img src={twitter} alt="Twitter" />
                </a>
                <a href="https://instagram.com/" className={styles.icon}>
                  <img src={instagram} alt="instagram" />
                </a>
                <a href="https://tumblr.com/" className={styles.icon}>
                  <img src={tumblr} alt="Tumblr" />
                </a>
              </Grid>
              <Grid item>
                <Typography>© Gaymers 2020</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              <strong>Secciones</strong> 
            </Typography>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link href="" className={styles.link}>Home</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="" className={styles.link}>Juegos</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="" className={styles.link}>FAQ</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="" className={styles.link}>Intercambiar</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="" className={styles.link}>Iniciar Sesión</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              <strong>Nosotros</strong> 
            </Typography>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link href="https://github.com/juanda2024" className={styles.link}>David Monsalve</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="https://github.com/jupardo" className={styles.link}>Julian Pardo</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="https://github.com/linkhl09" className={styles.link}>Andres Hernandez</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="https://github.com/dasantele" className={styles.link}>Santiago Leal</Link>
              </li>
            </ul>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {'made with love. By team 3 '}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
    );
  };
  
  export default Footer;