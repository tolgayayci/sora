import React from "react";
import Head from "next/head";
import ProjectsComponent from "components/projects/Projects";

function Projects() {
  return (
    <React.Fragment>
      <Head>
        <title>Projects - DFINITY DFX</title>
      </Head>
      <ProjectsComponent />
    </React.Fragment>
  );
}

export default Projects;
