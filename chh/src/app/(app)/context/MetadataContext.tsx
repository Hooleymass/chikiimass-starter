'use client'

import { createContext, useState, useEffect } from 'react';
import { Metadata } from 'next';

interface MetadataContextType {
  metadata: Metadata;
  setMetadata: (metadata: Metadata) => void;
  children: any;
}

export const MetadataContext = createContext<MetadataContextType>({
  metadata: {},
  setMetadata: () => {},
});

export const MetadataProvider: React.FC = ({ children }) => {
  const [pageMetadata, setPageMetadata] = useState<Metadata>({
    keywords: 'video, sharing, camera phone, video phone, free, upload',
  });

  useEffect(() => {
    setPageMetadata((prev) => ({
      ...prev,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    }));
  }, []);

  const setMetadata = (metadata: Metadata) => {
    setPageMetadata(metadata);
  };

  return (
    <MetadataContext.Provider value={{ metadata: pageMetadata, setMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
};
