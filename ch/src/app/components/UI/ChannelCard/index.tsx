"use client"
import { Image } from "@nextui-org/image";
import { usePathname } from "next/navigation";
import React from "react";


type ChannelCardProps = {
  title: string;
  name: string;
  thumbnail: string;
  alt: string;
  views: string;
  published: any;
};

const ChannelCard: React.FC<ChannelCardProps> = ({ title, name, thumbnail, alt, views, published }) => {
  const pathname = usePathname();

  const cardClassName = pathname === "/"
    ? "xs:min-w-[288px] sx:min-w-[324px] sm:min-w-[343px] md:min-w-[422px] mx-auto mb-4"
    : "max-w-[422px] mx-auto mb-4";

  return (
    <div className={`${cardClassName}`}>
      <div>
        <img className="rounded-lg w-full" src={thumbnail} alt={alt} loading="lazy" width={422}  />
      </div>
      <div className="bg-base-100 p-4">
        <div className="dark: font-bold uppercase text-base">{title}</div>
        <div className="text-gray-400 text-sm mt-1">
          <div>{name}</div>
          <div className="flex items-center mt-1">
            <span>{views}</span>
            <span className="mx-1">•</span>
            <span>{published}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelCard;