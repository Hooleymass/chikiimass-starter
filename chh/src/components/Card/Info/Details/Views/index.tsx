import React from 'react';

interface ViewsProps {
  views: string;
}

const Views: React.FC<ViewsProps> = ({ views }) => {
  return (
    <div>
      {views}
    </div>
  );
};

export default Views;