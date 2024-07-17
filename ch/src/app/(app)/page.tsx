import React from 'react'
import Home from './Home'
import { getSeries } from './getSeries';

const page = async () => {
  const data = await getSeries();
  return (
    <Home series={data} />
  )
}

export default page
