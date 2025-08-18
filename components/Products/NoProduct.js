import styles from "./Products.module.scss";

const NoProduct = () => {
  return (
    <div className={styles.no_product_container}>
      <div className={styles.no_product}>
        <img src={"/NoProduct.png"}></img>
        <div className={styles.no_product_text}>
          <p>Please Check Back Later</p>
          <p>No Products available currently</p>
        </div>
      </div>
    </div>
  );
};

export default NoProduct;
