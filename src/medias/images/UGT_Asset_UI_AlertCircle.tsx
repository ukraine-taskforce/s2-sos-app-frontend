import React from "react";

export interface ImgAlertCircleProps extends React.SVGProps<SVGSVGElement> {
  alt?: string;
  fill?: string;
}

export const ImgAlertCircle: React.FunctionComponent<ImgAlertCircleProps> = ({ alt, fill, ...props }) => {
  return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="30" fill="#F1F1F1"/>
        <path d="M38.7504 37.3262V28.0762C38.7504 22.9757 34.6008 18.8262 29.5004 18.8262C24.4 18.8262 20.2504 22.9757 20.2504 28.0762V37.3262C19.2286 37.3262 18.4004 38.1543 18.4004 39.1762V41.0262C18.4004 42.048 19.2286 42.8762 20.2504 42.8762H38.7504C39.7722 42.8762 40.6004 42.048 40.6004 41.0262V39.1762C40.6004 38.1544 39.7722 37.3262 38.7504 37.3262ZM22.1004 28.0762C22.1004 23.9889 25.4138 20.6762 29.5004 20.6762C33.587 20.6762 36.9004 23.9889 36.9004 28.0762V37.3262H22.1004V28.0762ZM38.7504 41.0262H20.2504V39.1762H38.7504V41.0262Z"
              fill={fill ?? "var(--color-action)"}/>
      </svg>
  );
};
