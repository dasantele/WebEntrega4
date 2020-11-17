import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import React from "react";
import VerticalLinearStepper from "./stepper";

const useStyles = makeStyles((theme) => ({
  container: {
    color: "white",
    padding: "48px",
  },
  title: {
    fontSize: "40px",
    textAlign: "center",
    color: "white",
    margin: "24px",
    fontFamily: "Yanone Kaffeesatz, sans-serif",
  }
}));

const Content = (props) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (<>
    <Typography variant="h1" className={styles.title}>Gaymers, el lugar donde puedes intercambiar tus juegos</Typography>
    <VerticalLinearStepper>

    </VerticalLinearStepper>
    </>
  );
};

export default Content;
