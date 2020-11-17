import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  CssBaseline,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useLocation } from "react-router";
import Intercambios from "./Intercambios";
import Perfil from "./Perfil";
import Publicaciones from "./Publicaciones";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Breadcrumb from "../breadcrumbs/breadcrumbs";

const useStyles = makeStyles((theme) => ({
  general: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    alignSelf: "start",
  },
  hidden: {
    visibility: "hidden",
  },
  show: {
    visibility: "visible",
  },
  container: {
    width: "100%",
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const bread = [
  { tittle:'Home', path:'/'},
  { tittle: 'Juegos', path:'/'},
  { tittle: 'FAQ', path:'/'},
]

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function FAQ({ user, setUser, redirectPrefix }) {
  useLocation();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <Breadcrumb 
        pan={bread}
        />
      <div className={classes.general}>
        <Typography component="h1" variant="h4">
          Preguntas frecuentes
        </Typography>
        <div className={classes.container}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Intercambios</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Intercambios />
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Perfil</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Perfil />
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Publicaciones</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Publicaciones />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Container>
  );
}
