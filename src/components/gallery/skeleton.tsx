import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonGallery = () => (
  <ContentLoader
    speed={2}
    width={580}
    height={550}
    viewBox="0 0 580 550"
    backgroundColor="#e8e8e8"
    foregroundColor="#c9c9c9"
    className="gallery__photo ">
    <rect x="0" y="0" rx="20" ry="20" width="560" height="520" />
  </ContentLoader>
);

export default SkeletonGallery;
