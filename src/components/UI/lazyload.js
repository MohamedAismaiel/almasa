// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const placeHolder = "";

// const Image = styled.img`
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   background-color: rgb(163, 148, 148);
//   margin-right: 1rem;
//   transform: translateX(70%);
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   transition: all 0.2s;
//   // Add a smooth animation on loading
//   @keyframes loaded {
//     0% {
//       opacity: 0.1;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
//   // I use utilitary classes instead of props to avoid style regenerating
//   &.loaded:not(.has-error) {
//     animation: loaded 300ms ease-in-out;
//   }
//   &.has-error {
//     // fallback to placeholder image on error
//     content: url(${placeHolder});
//   }
// `;

// export const LazyImage = ({ src, alt }) => {
//   const [imageSrc, setImageSrc] = useState(placeHolder);
//   const [imageRef, setImageRef] = useState();

//   const onLoad = (event) => {
//     event.target.classList.add("loaded");
//   };

//   const onError = (event) => {
//     event.target.classList.add("has-error");
//   };

//   useEffect(() => {
//     let observer;
//     let didCancel = false;

//     if (imageRef && imageSrc !== src) {
//       console.log(IntersectionObserver);
//       if (IntersectionObserver) {
//         observer = new IntersectionObserver(
//           (entries) => {
//             entries.forEach((entry) => {
//               if (
//                 !didCancel &&
//                 (entry.intersectionRatio > 0 || entry.isIntersecting)
//               ) {
//                 setImageSrc(src);
//                 observer.unobserve(imageRef);
//               }
//             });
//           },
//           {
//             threshold: 0.01,
//             rootMargin: "0%",
//           }
//         );
//       } else {
//         // Old browsers fallback
//         setImageSrc(src);
//       }
//     }

//     return () => {
//       didCancel = true;
//       // on component cleanup, we remove the listner
//       if (observer && observer.unobserve) {
//         observer.unobserve(imageRef);
//       }
//     };
//   }, [src, imageSrc, imageRef]);
//   return (
//     <Image
//       ref={setImageRef}
//       src={imageSrc}
//       alt={alt}
//       onLoad={onLoad}
//       onError={onError}
//     />
//   );
// };

function LazyImage(props) {
  return (
    <img
      src="https://almasa-project-bucket.s3.eu-west-3.amazonaws.com/58afd6b70187e59a7d8a8f1c.png"
      alt="dd"
    />
  );
}
export default LazyImage;
