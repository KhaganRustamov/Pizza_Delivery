import styles from "./notFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        По вашему запросу ничего не найдено
      </h1>
    </div>
  );
};

export default NotFoundBlock;
