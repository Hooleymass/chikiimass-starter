"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type ChannelCardProps = {
  title: string;
  name: string;
  thumbnail: string;
  alt: string;
  views: number;
  published: any;
};

const ChannelCard: React.FC<ChannelCardProps> = ({
  title,
  name,
  thumbnail,
  alt,
  views,
  published,
}) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const cardClassName =
    pathname === "/"
      ? "xs:min-w-[288px] sx:min-w-[324px] sm:min-w-[343px] md:min-w-[422px] mx-auto mb-4"
      : "max-w-[422px] mx-auto mb-4";

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`${cardClassName}`}>
      <div className="relative">
        {isLoading && (
          <div className="rounded-lg w-full h-[250px] bg-gray-500"></div>
        )}
        <Image
          className={`rounded-lg w-full ${isLoading ? "hidden" : "block"}`}
          src={thumbnail}
          alt={alt}
          priority
          height={250}
          width={600}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="bg-base-100 p-4">
        {isLoading ? (
          <div className="">
            <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-500 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-500 rounded w-1/4"></div>
          </div>
        ) : (
          <>
            <div className="font-bold uppercase text-base">{title}</div>
            <div className="text-gray-400 text-sm mt-1">
              <div>{name}</div>
              <div className="flex items-center mt-1">
                <span>{views}</span>
                <span className="mx-1">•</span>
                <span>{published}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChannelCard;
