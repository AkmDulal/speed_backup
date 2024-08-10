"use client";
import ContentLoader from "react-content-loader";

const ProductCardLoader = () => (
  <>
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 150 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="150" height="100" />
      <rect x="10" y="120" rx="5" ry="5" width="130" height="20" />
      <rect x="10" y="150" rx="5" ry="5" width="130" height="20" />
    </ContentLoader>
  </>
);

export default ProductCardLoader;
