import React from "react";
import {
  AppBar,
  Button,
  Grid,
  Link,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none!important",
    color: "#FFFFFF",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
  },
  title: {
    flexGrow: 1,
  },
}));

const navLinks = [
  { tittle: `Juegos`, icon: `videogame_asset`, path: "/marketplace" },
  { tittle: `FAQ`, icon: `storefront`, path: "/faq" },
  { tittle: `Intercambiar`, icon: `sync_alt`, path: "/posts" },
];

const NavBar = ({ user }) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {navLinks.map((item) => (
              <MenuItem >
                <Link href={item.path} className={styles.link}>
                  <Icon>{item.icon}</Icon> {item.tittle}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Hidden>

        <Grid item xs={10}>
          <Link href="/" color="inherit" className={styles.link}>
            <Button style={{ flexGrow: 1 }} color="inherit">
              <Icon>sports_esports</Icon>
              <Hidden>Gaymers</Hidden>
            </Button>
          </Link>
          <Hidden smDown>
            <Link href="/marketplace" color="inherit" className={styles.link}>
              <Button style={{ flexGrow: 1 }} color="inherit">
                <Icon>videogame_asset</Icon>
                <Hidden smDown>Juegos</Hidden>
              </Button>
            </Link>
            <Button href="/faq" style={{ flexGrow: 1 }} color="inherit">
              <Icon>storefront</Icon>
              <Hidden smDown>FAQ</Hidden>
            </Button>
            <Link href="/posts" color="inherit" className={styles.link}>
              <Button style={{ flexGrow: 1 }} color="inherit">
                <Icon>sync_alt</Icon>
                <Hidden smDown>Intercambiar</Hidden>
              </Button>
            </Link>
          </Hidden>
        </Grid>
        <Grid item xs={4}>
          {!user && (
            <Link href={"/login"} className={styles.link} color="inherit" aria-label="boton de inicio de sesión">
              <Button color="inherit">
                <Icon>login</Icon>
                <Hidden smDown>Iniciar sesión</Hidden>
              </Button>
            </Link>
          )}
          {user && (
            <Link href={"/user"} className={styles.link} color="inherit">
              <Button color="inherit">
                <Icon>person</Icon>
                <Hidden smDown>{user.nombre}</Hidden>
              </Button>
            </Link>
          )}
          {!user && (
            <Link href={"/register"} className={styles.link} color="inherit" aria-label="boton de registro">
              <Button color="inherit">
                <PersonAddIcon />
                <Hidden smDown>Registrar</Hidden>
              </Button>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
