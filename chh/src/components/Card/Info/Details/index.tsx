import React from 'react'
import Time from './Time'
import Views from './Views'
interface DetailsProps {
  time: string;
  views: string;
}
const Details: React.FC<DetailsProps> = ({ time, views }) => {
  return (
    <div className='flex space-x-4'>
        <Time time={time} />
        <Views views={views} />
    </div>
  )
}

export default Details
