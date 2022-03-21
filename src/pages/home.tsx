import React, { FC } from "react";
import { Header } from '../components/header'

import { HomePageCarousel } from '../components/home/carousel'
import { ActionButtons } from '../components/home/action_buttons'
import HomePageLogo from '../svgs/homepage.svg'

const carouselDataEng = [
  {
    title: "Welcome to SOS App",
    description: "SOS App by UGT was designed to give refugees quick access to <>"
  },
  {
    title: "1. Fill in your information",
    description: "Tell us who you are, where you are staying and the name of the person you are staying with. We will store this information in case of emergency"
  },
  {
    title: "2. When you are in trouble, hit the red button",
    description: "When you hit the red button, we will contact the local authorities and verify that thay are on the way to your location."
  }
];

const HomePage: FC = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="mx-auto">
        <img src={HomePageLogo} className="mx-auto py-5" />
      </div>
      <HomePageCarousel carouselData={carouselDataEng} />
      <ActionButtons />
    </React.Fragment>
  )
};

export default HomePage;
