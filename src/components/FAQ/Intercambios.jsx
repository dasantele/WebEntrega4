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

export default function Intercambios() {
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
          aria-controls="ex-p1d-content"
          id="ex-p1d-header"
        >
          <Typography>
            <b>¿Cómo realizo un intercambio?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            ¡Realizar un intercambio es sencillo! <br />
            Puedes publicar tus propios juegos y especificar que tipo de juegos
            te gustaria intercambiar. Si alguien se interesa en realizar un
            intercambio con tigo, serás notificado al correo para que entren en
            contacto y cuadren el intercambio.
            <br />
            <br />
            También puedes revisar la oferta de juegos y ver si ya existe una
            publicación con un intercambio que te interese. En caso de tenerla
            oprime el botón de realizar intercambio y te pondremos en contacto
            con quien realizo la oferta para que cuadren el intercambio.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "p2"} onChange={handleChange("p2")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="ex-p2d-content"
          id="ex-p2d-header"
        >
          <Typography>
            <b>¿Qué me asegura que los intercambios sean seguros?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            La reputación de un usuario es todo para el. Puedes revisar el
            perfil del ofertante antes de realizar el intercambio y revisar los
            comentario realizados por otros usuarios. En caso de que un usuario
            tenga muchos problemas, un moderador analizará el caso con el fin de
            ver si este se banea de la plataforma.
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
          aria-controls="ex-p3d-content"
          id="ex-p3d-header"
        >
          <Typography>
            <b>¿Cómo califico los intercambios?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="body1" variant="body1" className={classes.answer}>
            Al final de los intercambios siempre podrás realizar la calificación
            del intercambio. La calificación se compone de dos partes, el
            puntaje (que va de uno a diez) y tus comentarios. <br />
            ¡Sientete libre de comentar todo lo que quieras! Recuerda que tus
            comentarios ayudarán a otros usuarios.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
