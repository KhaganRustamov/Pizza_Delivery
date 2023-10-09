import styles from "./notFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        По вашему запросу ничего не найдено
      </h1>
    </div>
  );
}

export default NotFoundBlock;
