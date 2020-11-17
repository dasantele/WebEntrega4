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

export default function Perfil() {
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
          aria-controls="profile-p1d-content"
          id="profile-p1d-header"
        >
          <Typography>
            <b>¿Cómo reviso mi dashboard?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            Para encontrar tu dashboard debes iniciar sesión. Una vez inicies
            sesión en la barra de navegación verás un icono con tu nombre que te
            llevará a tu dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "p2"} onChange={handleChange("p2")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="profile-p2d-content"
          id="profile-p2d-header"
        >
          <Typography>
            <b>¿Cómo puedo modificar la información de mi cuenta?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            Esta funcionalidad esta en progreso. Te agradecemos que esperes
            pacientemente mientras que la desarrollamos. <br />
            Si necesitas algo con urgencia, puedes escribirnos a nuestro correo
            grupo6gaymer@gmail.com y con gusto un moderador se comunicará con
            tigo.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "p3"}
        onChange={handleChange("p3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="profile-p3d-content"
          id="profile-p3d-header"
        >
          <Typography>
            <b>Quiero cancelar mi cuenta.</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            Nos entristece que te vayas :c <br />
            Para cancelar tu cuenta por favor escribe un correo a
            grupo6gaymer@gmail.com, un moderador se comunicará con tigo para
            continuar con el proceso. Esperamos verte nuevamente en otra
            ocasión.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
