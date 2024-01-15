import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1200}
    height={400}
    viewBox="0 0 1200 400"
    backgroundColor="#e8e8e8"
    foregroundColor="#c9c9c9"
    {...props}>
    <rect x="0" y="0" rx="20" ry="20" width="600" height="370" />
    <rect x="620" y="70" rx="10" ry="10" width="570" height="210" />
    <rect x="620" y="10" rx="10" ry="10" width="570" height="40" />
    <rect x="650" y="320" rx="10" ry="10" width="68" height="40" />
    <rect x="1070" y="320" rx="10" ry="10" width="68" height="40" />
  </ContentLoader>
);

export default NewsSkeleton;
