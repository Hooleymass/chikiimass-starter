import Link from 'next/link';
import React from 'react';

interface NameProps {
  name: string;
}

const Name: React.FC<NameProps> = ({ name }) => {
  return (
    <Link href={`/info/${name}`}>
      {name}
    </Link>
  );
};

export default Name;
