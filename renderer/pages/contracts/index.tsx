import React from "react";
import Head from "next/head";
import ContractsComponent from "components/contracts/Contracts";

function Contracts() {
  return (
    <React.Fragment>
      <Head>
        <title>Contracts - Soroban</title>
      </Head>
      <ContractsComponent />
    </React.Fragment>
  );
}

export default Contracts;
