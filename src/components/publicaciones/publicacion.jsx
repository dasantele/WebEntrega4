import { makeStyles, useTheme } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import css_zoom from "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import Banner from "../../components/home/productImage";
import { getPublicacion } from "../../api/publicacion";
import Rating from "../rating/rating";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getProducto } from "../../api/productos";
import { getQuestion } from "../../api/question";
import { createRecibo } from "../../api/recibo";
import { createQuestion } from "../../api/question";

const {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
} = require("@material-ui/core");
const { default: Skeleton } = require("@material-ui/lab/Skeleton");

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  paper2: {
    margin: "auto",
  },
  card2: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  noResults: {
    textAlign: "center",
    margin: "24px auto",
  },
  productCard: {
    width: "100%",
  },
  media: {
    backgroundSize: "cover",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  carousel: {
    background: theme.palette.secondary.main,
  },
}));

const Publicacion = ({ user }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const id = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [publicacion, setPublicacion] = useState();
  const [producto_publicacion, setProductoPublicacion] = useState();
  const [preguntas_publicacion, setPreguntasPublicacion] = useState();
  const [pregunta_realizada, setPreguntaRealizada] = useState();
  const [open, setOpen] = useState(false);

  const handleExchangeButton = async () => {
    await createRecibo({
      idPublicacion: publicacion._id,
      idVendedor: publicacion.id_vendedor,
      idCliente: user._id,
      valor: publicacion.precio,
    });
    setOpen(true);
  };

  const handleQuestionButton = async () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let fecha_actual = year + "-" + month + "-" + date;
    await createQuestion({
      fecha: fecha_actual,
      pregunta: pregunta_realizada,
      respuesta: "None",
      id_quien_pregunta: user._id,
      id_publicacion: publicacion._id,
      estado: "Activa",
    });
    setOpen(true);
  };

  const Productcarousel = (props) => {
    const items = [
      {
        image: producto_publicacion.imagenes[1],
      },
      {
        image: producto_publicacion.imagenes[2],
      },
    ];
    return (
      <Carousel autoPlay={false} timer={5000} timeout={1000} indicators={false}>
        {items.map((item, i) => (
          <a>
            <InnerImageZoom src={item.image} />
          </a>
        ))}
      </Carousel>
    );
  };

  const handleClose = () => {
    window.location.assign("/");
  };
  useEffect(() => {
    async function getPublicacionId() {
      try {
        if (
          (publicacion === null || publicacion === undefined) &&
          (producto_publicacion === null || producto_publicacion === undefined)
        ) {
          const publicacion = await getPublicacion(id);
          const preguntas_publicacion = [];
          for (let index = 0; index < publicacion.opiniones.length; index++) {
            const pregunta_publicacion_actual = await getQuestion(
              publicacion.opiniones[index]
            );
            preguntas_publicacion.push(pregunta_publicacion_actual);
          }
          const producto_publicacion = await getProducto(
            publicacion.id_producto
          );

          setPreguntasPublicacion(preguntas_publicacion);
          setPublicacion(publicacion);
          setProductoPublicacion(producto_publicacion);
          setIsLoading(false);
        }
      } catch (error) {
        setPublicacion(undefined);
        setProductoPublicacion(undefined);
        setIsLoading(false);
      }
    }
    getPublicacionId();
  }, []);
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Intercambio enviado</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Te enviaremos un correo confirmando el intercambio
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            ¡Genial!
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && (
        <>
          <Skeleton width="100%" height="320px" variant="text" />
          <Skeleton width="100%" variant="text" />
          <Skeleton width="100%" variant="text" />
          <Skeleton width="60%" variant="text" />
        </>
      )}
      {!isLoading && (
        <>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper className={classes.paper + "2"}>
                  <Productcarousel />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h3" color="initial">
                    {publicacion.titulo}
                  </Typography>
                  <br></br>
                  <Typography variant="subtitle1" color="initial">
                    {publicacion.descripcion}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    <b>Ubicación: </b> {publicacion.ciudad}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    {publicacion.descuento !== "0" && (
                      <Typography variant="subtitle1" color="initial">
                        <b>Descuento: </b>
                        {publicacion.descuento}
                      </Typography>
                    )}
                    {publicacion.descuento === "0" && (
                      <Typography variant="subtitle1" color="initial">
                        <b>Descuento: </b> Sin descuento
                      </Typography>
                    )}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    <b>Fecha publicación: </b> {publicacion.fechaPublicacion}
                  </Typography>
                  <br></br>
                  <Typography variant="subtitle1" color="initial">
                    Precio: ${publicacion.precio} COP
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    fullWidth
                    onClick={handleExchangeButton}
                  >
                    Intercambiar
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" color="initial">
                    Descripción del juego: {producto_publicacion.nombre}
                  </Typography>
                  <Rating />
                  <Typography variant="subtitle1" color="initial">
                    {producto_publicacion.descripcion}
                  </Typography>
                  <Typography variant="h6" color="initial">
                    Categorias:
                    {producto_publicacion.categorias.map((elemento) => (
                      <Typography variant="subtitle1" color="initial">
                        - {elemento}
                      </Typography>
                    ))}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" color="initial">
                    Preguntas:
                  </Typography>
                  {preguntas_publicacion.map((pregunta) => (
                    <Card>
                      <Typography variant="subtitle1" color="initial">
                        <b>Pregunta: </b> {pregunta.pregunta}
                      </Typography>
                      <Typography variant="subtitle1" color="initial">
                        {pregunta.respuesta !== "None" && (
                          <Typography variant="subtitle1" color="initial">
                            <b>Respuesta: </b>
                            {pregunta.respuesta}
                          </Typography>
                        )}
                      </Typography>
                    </Card>
                  ))}
                  {publicacion.opiniones.length === 0 && (
                    <Typography variant="subtitle1" color="initial">
                      Nadie ha preguntado! Se el primero en preguntar
                    </Typography>
                  )}
                  <Grid item xs={12}>
                    <ValidatorForm onSubmit={handleQuestionButton}>
                      <TextValidator
                        onChange={(event) =>
                          setPreguntaRealizada(event.target.value)
                        }
                        id="filled-full-width"
                        placeholder="Escribe una pregunta"
                        fullWidth
                        margin="normal"
                        variant="filled"
                      />
                      <Button type="submit" fullWidth>
                        Hacer pregunta
                      </Button>
                    </ValidatorForm>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </Container>
  );
};

export default Publicacion;
