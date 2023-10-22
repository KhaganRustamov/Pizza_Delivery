import styles from "./notFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>No results were found for your request</h1>
    </div>
  );
};

export default NotFoundBlock;
