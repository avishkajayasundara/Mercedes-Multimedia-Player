import React from "react";
import { Carousel } from "react-bootstrap";
import "./slideshow.css";

import image1 from "../images/1.jpg";

export default function slideshow() {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img className="d-block w-100 image" src={image1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 image"
          src="https://i.pinimg.com/originals/7d/36/6c/7d366c1ee7625c7873db32107265ec47.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 image"
          src="https://wallpaperaccess.com/full/195879.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
