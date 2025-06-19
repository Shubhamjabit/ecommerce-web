import { useRouter } from 'next/router'
import Categories from '../../components/Industry/Categories';
import styles from '../../components/Industry/industry.module.scss';
import { MasterHeader } from '../../components/MasterHeader';
import { Container, Row, Col } from "react-bootstrap";
import { BreadcrumbUI } from '../../components/Breadcrumb';
import { Layout } from "../../components/Layout/Layout";
import { endPoint, envUrl } from "../../utils/factory";


const Industryname=({pageData})=>{
    const router=useRouter()
    const {name}=router.query
    const activePath=`industry/${name}`
    const categories=pageData.data.Category.filter(cat=>cat.name===name)[0].category_lsit
    return (
        <>
        
        <MasterHeader title="Home" isHomePage={true} />
        <Layout 
            CategoryData={pageData.data.Category}
            assemblySolutionsList={pageData.data.assemblySolutionsList}
        >
        <Container>
            <Row>
                <BreadcrumbUI routedata={activePath.split('/')}/> 
                <div className={styles.industryGrid}>
                    <Categories categories={categories} /> 
                </div>
            </Row>
        </Container>
        </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`${envUrl.baseUrl}${endPoint.HomePageData}`);
    const pageData = await response.json();
  
    // //Get Our Popular Products
    // const products = await fetch(`${envUrl.baseUrl}${endPoint.products}`);
    // const productData = await products.json();
    // // //Get Our Category
    // const categories = await fetch(`${envUrl.baseUrl}${endPoint.categories}`);
    // const categoriesData = await categories.json();
    return {
      props: {
        pageData,
      },
    };
}

export default Industryname;