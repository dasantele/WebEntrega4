import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: "none!important",
      color:"#FFFFFF"
    },
    root: {
      flexGrow: 1,
    },
    breadcrumbs:{
        display:"block",
        textAlign:"center",
    },
    container: {
        marginLeft:"auto",
        marginRight:"auto",
        display: 'block',
    },
    
  }));

function handleClick(event) {
    event.preventDefault();
}


  
const Breadcrumb = (props) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const pan= props.pan;

    return (
        <Container className={styles.Container}>
        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
          {pan.map((item)=>(
              <Link href={item.path} onClick={handleClick} className={styles.link}>{item.tittle}</Link>
          ))}
        </Breadcrumbs>
        </Container>
      );



}
export default Breadcrumb;