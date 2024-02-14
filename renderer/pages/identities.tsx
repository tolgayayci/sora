import React from "react";
import Head from "next/head";
import IdentitiesComponent from "components/identities/Identities";

function Settings() {
  return (
    <React.Fragment>
      <Head>
        <title>Identities - Soroban</title>
      </Head>
      <IdentitiesComponent />
    </React.Fragment>
  );
}

export default Settings;
