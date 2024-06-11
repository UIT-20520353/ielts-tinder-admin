import React from "react";
import ContentLoader from "react-content-loader";

interface SkeletonLoaderProps {
  width?: number;
  height?: number;
  speed?: number;
}

const SkeletonLoader: React.FunctionComponent<SkeletonLoaderProps> = ({
  width = 200,
  height = 20,
  speed = 1.5,
}) => {
  return (
    <ContentLoader
      backgroundColor="#cfcfcf"
      foregroundColor="#ffffff"
      speed={speed}
      width={width}
      height={height}
    >
      <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default SkeletonLoader;
