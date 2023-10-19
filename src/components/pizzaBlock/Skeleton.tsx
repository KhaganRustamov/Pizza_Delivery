import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={800}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="136" cy="122" r="122" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="21" />
    <rect x="0" y="300" rx="10" ry="10" width="280" height="83" />
    <rect x="0" y="409" rx="10" ry="10" width="91" height="30" />
    <rect x="130" y="400" rx="20" ry="20" width="150" height="40" />
  </ContentLoader>
);

export default Skeleton;
