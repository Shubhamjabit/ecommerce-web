import styles from "../Product.module.scss";
import React from "react";
import ImageGallery from "react-image-gallery";
import { imageURLs } from "../../../utils/factory";
// const product_media = [
//   {
//     original: "/images/products/category.png",
//     thumbnail: "/images/products/category.png",
//   },
//   {
//     original: "/images/products/image(4).png",
//     thumbnail: "/images/products/image(4).png",
//   },
//   {
//     original: "/images/products/image(5).png",
//     thumbnail: "/images/products/image(5).png",
//   },
//   {
//     original: "/images/products/image(6).png",
//     thumbnail: "/images/products/image(6).png",
//   },
//   {
//     original: "/images/products/image(7).png",
//     thumbnail: "/images/products/image(7).png",
//   },
// ];
const ImageArea = ({ product }) => {
  return (
    <div className="ImageGallery">
      <ImageGallery
        items={imageURLs({
          images: product.product_media,
          title: product.name,
        })}
        showNav={true}
        showPlayButton={false}
        originalClass={styles.originalImage}
        // fullscreen={true}
        disableThumbnailScroll={false}
      />
    </div>
  );
};
export default ImageArea;
