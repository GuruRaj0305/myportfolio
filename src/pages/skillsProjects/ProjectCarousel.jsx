

import { useState } from "react";
import Slider from "react-slick";
import ImageDetailView from "./ImageDetailView";

const ProjectImages = ({ images, projectName }) => {
  const [detailIndex, setDetailIndex] = useState(null);

  return (
    <>
      {/* Carousel */}
      <div className="mt-8 w-full">
        <Slider
          dots={true}
          infinite={true}
          speed={400}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
        >
          {images.map((img, idx) => (
            <div key={idx} className="p-2">
              <img
                src={img}
                alt={`${projectName} screenshot ${idx + 1}`}
                className="w-full rounded-xl object-cover shadow-xl cursor-pointer hover:scale-[1.03] transition-all duration-300"
                onClick={() => setDetailIndex(idx)} // open detail view
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
