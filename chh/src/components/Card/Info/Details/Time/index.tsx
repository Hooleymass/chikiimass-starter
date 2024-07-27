import React from 'react';

interface TimeProps {
  time: string;
}

const Time: React.FC<TimeProps> = ({ time }) => {
  return (
    <div>
      {time}
    </div>
  );
};

export default Time;