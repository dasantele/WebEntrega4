import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const Banner = ({ title, description, image }) => {
  const useStyles = makeStyles((theme) => ({
    banner: {
      width: "100%",

      background: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      minHeight: "240px",
      height: "50vh",
      [theme.breakpoints.down("xs")]: {
        height: "30vh",
        paddingBottom: "8px",
      },
      "& img": {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
      },
    },
    flex: {
      display: "flex",
      textAlign: "center",
      flexDirection: "column-reverse",
      paddingBottom: "8px",
    },
    box: {
      color: "#fff",
      fontFamily: "Segoe UI",
    },
    title: {
      fontFamily: "Yanone Kaffeesatz, sans-serif",
    },
  }));
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <Grid container className={styles.banner}>
      <Grid item xs={12} className={styles.flex}>
        <div className={styles.box}>
          <Typography className={styles.title} variant="h4">
            {title}
          </Typography>
          <Typography variant="subtitle1">{description}</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Banner;
