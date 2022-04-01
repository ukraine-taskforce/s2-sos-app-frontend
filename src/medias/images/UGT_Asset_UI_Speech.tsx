import React from "react";

export interface ImgSpeechProps extends React.SVGProps<SVGSVGElement> {
  alt?: string;
  fill?: string;
}

export const ImgSpeech: React.FunctionComponent<ImgSpeechProps> = ({ alt, fill, ...props }) => {
  return (
    <svg width="24" height="24" viewBox="-2 -4 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 0H2C0.9 0 0 0.9 0 2V20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H4L2 16V2H18V14Z"
        fill={fill ?? "var(--color-action)"}
      />
    </svg>
  );
};
