import React from 'react';
import { Link } from 'react-router-dom';

interface NameProps {
  name: string;
}

const Name: React.FC<NameProps> = ({ name }) => {
  return (
    <Link to={`/info/${name}`}>
      {name}
    </Link>
  );
};

export default Name;
