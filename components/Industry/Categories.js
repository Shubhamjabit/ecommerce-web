import styles from "./industry.module.scss";
import { MasterHeader } from "../MasterHeader";
import { useRouter } from "next/router";
import { Empty } from "antd";
const Categories = ({ categories }) => {
  const router = useRouter();
  return (
    <>
      {categories ? (
        <>
          {categories.map((item) => {
            return (
              <div
                className={styles.category}
                key={item.id}
                onClick={() => router.push(`/${item.name}`)}
              >
                <div className={styles.image}>
                  <img src={process.env.CATEGORY_CDN_URL + item.image_url} />
                </div>
                <div className={styles.industry_text}>
                  <p>{item.name}</p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <Empty />
      )}
      {/* {categories.map((item)=>{
            return(
                <div className={styles.category} key={item.id} onClick={()=>router.push(`/${item.name}`)}>
                    <div className={styles.image}>
                        <img src={process.env.CATEGORY_CDN_URL+item.image_url} />
                    </div>
                <div className={styles.industry_text}>
                    <p>{item.name}</p>
                </div>
                </div>
            )
           })} */}
    </>
  );
};

export default Categories;
