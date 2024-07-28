import React from 'react';
import Name from './Name';
import Title from './Title';
import Details from './Details';
import Link from 'next/link';

interface InfoProps {
  name: string;
  title: string;
  time: string;
  views: string;
}

const Info: React.FC<InfoProps> = ({ name, title, time, views }) => {
  return (
    <div className='w-[422] '>
    
      <Title title={title} />
      <Name name={name} />
      <Details time={time} views={views} />
    </div>
  );
};

export default Info;
