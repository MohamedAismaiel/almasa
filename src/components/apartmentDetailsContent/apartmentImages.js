import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineCamera } from "react-icons/ai";
function ApartmentImages() {
  const apartment = useContext(LoginContext).singleApartment;
  const showImages = useContext(LoginContext).showImageGallery;

  if (apartment.photos) {
    return (
      <div className="image-grid">
        {apartment.photos.map((p, i) => {
          if (i <= 2) {
            let classImageName = `image-grid-${i + 1}`;
            return (
              <LazyLoadImage
                key={p.id}
                src={p.location}
                height="100%"
                width="30%"
                alt="apartment"
                className={classImageName}
              ></LazyLoadImage>
            );
          }
          return null;
        })}
        <button className="button button-camera" onClick={showImages}>
          <AiOutlineCamera size={20} />
          <span>Show {apartment.photos.length} photos</span>
        </button>
      </div>
    );
  } else return <></>;
}
export default ApartmentImages;
