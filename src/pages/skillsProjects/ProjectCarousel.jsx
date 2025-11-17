import { useState } from "react";
import Slider from "react-slick";
import ImageDetailView from "./ImageDetailView";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectImages = ({ images, projectName }) => {
  const [detailIndex, setDetailIndex] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <>
      {/* Carousel */}
      <div className="mt-8 w-full">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className="p-2 w-full">
              <img
                src={img}
                alt={`${projectName} screenshot ${idx + 1}`}
                className="
                  rounded-xl 
                  shadow-xl 
                  cursor-pointer 
                  transition-all 
                  duration-300 
                  hover:scale-[1.03]
                  mx-auto
                "
                onClick={() => setDetailIndex(idx)}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Full-screen detail view */}
      {detailIndex !== null && (
        <ImageDetailView
          src={images[detailIndex]}
          alt={`${projectName} ${detailIndex + 1}`}
          onClose={() => setDetailIndex(null)}
        />
      )}
    </>
  );
};

export default ProjectImages;
