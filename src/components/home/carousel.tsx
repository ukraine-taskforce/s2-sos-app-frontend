import React, { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { CarouselDataProps } from '../../interfaces/carousel'

export interface CarouselDataArrayProps {
  carouselData: CarouselDataProps[]
};

export const HomePageCarousel: FC<CarouselDataArrayProps> = ({carouselData}: CarouselDataArrayProps) => {
  return (
    <Carousel showArrows={true} emulateTouch={true} showThumbs={false} showStatus={false} infiniteLoop={true} dynamicHeight={true}>
      {carouselData.map((slideData, index) => {
          return (
            <div key={index}>
                <div className="mb-6 text-xl font-large font-bold text-center">{slideData.title}</div>
                <p className="text-m font-medium text-gray-900">{slideData.description}</p>
            </div>
          )
        })
      }
    </Carousel>
  );
};
