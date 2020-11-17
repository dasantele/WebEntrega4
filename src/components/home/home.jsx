import { Container } from "@material-ui/core";
import React from "react";
import Homecarousel from "./carousel";
import Content from "./content";
import Footer from "../footer/footer";
import Breadcrumb from "../breadcrumbs/breadcrumbs"

const bread = [
  { tittle:'Home', path:'/'}
]

const Home = (props) => {
  return <>
    <Homecarousel />
    <section id="content">
      <Breadcrumb
       pan={bread}
      />
      <Container maxWidth="md">
        <Content />
      </Container>
    </section>
    <Footer/>
  </>;
};

export default Home;