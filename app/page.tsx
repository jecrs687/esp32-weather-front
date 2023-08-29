
import { HomeComponent } from '@/services/home';
import React, { Ref, useEffect, useState } from 'react'
import Head from "next/head";


export default function Page() {
  return (
    <>
      <Head>
        <title>Estação Meteorológica</title>
      </Head>
      <HomeComponent  />
    </>
  )
}
