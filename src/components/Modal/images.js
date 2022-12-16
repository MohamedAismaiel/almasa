import { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LoginContext } from "../context/loginContext";
import ImageModal from "./imageModal";

function Images() {
  const [appear, setAppear] = useState(1);
  const apartment = useContext(LoginContext).singleApartment;

  const nextSlider = () => {
    setAppear((prev) => {
      if (apartment.photos.length <= prev) {
        return 1;
      }
      return prev + 1;
    });
  };
  const prevSlider = () => {
    setAppear((prev) => {
      if (prev === 1) {
        return apartment.photos.length;
      }
      return prev - 1;
    });
  };
  return (
    <ImageModal>
      {apartment.photos.map((p, i) => {
        let style;
        let classImageName = `content-image content-image-${i + 1}`;
        style = {
          // left: 0,
          transform: `translateX(${1400 * (i + 1 - appear)}%)`,
        };
        if (i + 1 === appear) {
          style = {
            // left: 0,
            transform: "translateX(0%)",
          };
        }
        return (
          <LazyLoadImage
            key={p.id}
            src={p.location}
            width="100%"
            height="100%"
            alt="apartment"
            className={classImageName}
            style={style}
          />
        );
      })}
      <button
        className="slider__btn slider__btn--left-imageGallery"
        onClick={prevSlider}
      >
        &larr;
      </button>
      <button
        className="slider__btn slider__btn--right-imageGallery "
        onClick={nextSlider}
      >
        &rarr;
      </button>
    </ImageModal>
  );
}
export default Images;
