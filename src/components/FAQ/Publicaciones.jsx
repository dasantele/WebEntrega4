import React from "react";
import { Typography, makeStyles, withStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  answer: {
    textAlign: "justify",
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

export default function Publicaciones() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.container}>
      <Accordion expanded={expanded === "p1"} onChange={handleChange("p1")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pub-p1d-content"
          id="pub-p1d-header"
        >
          <Typography>
            <b>¿Cómo publico un juego?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            Para realizar una publicación debes primero iniciar sesión. Una vez
            inicias sesión, dirigete a tu perfil, desde allí en la barra de
            opciónes a la izquirda veras la opción para crear una publicación.
            Una vez allí, completa los datos y ¡listo! Espera unos minutos y
            podrás ver en el marketplace tu publicación.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "p2"} onChange={handleChange("p2")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pub-p2d-content"
          id="pub-p2d-header"
        >
          <Typography>
            <b>¿Quienes pueden ver mis juegos?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            Todos los usuarios de la página pueden ver tu publicación mientras
            que no se haya realizado ya un intercambio/venta. Una vez se realiza
            el intercambio o la venta, podrás ver tus publicaciones antiguas en
            el dashboard para llevar un registro de tus intercambios.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
