import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
const ProductPage = dynamic(() => import("../components/ProductPage"), {
  loading: () => <ProductSkeleton />,
});
// const ProductPage = dynamic(() => import("../components/ProductPage"));
const ContentPage = dynamic(() => import("../components/ContentPage"));
const CategoryListPage = dynamic(() =>
  import("../components/CategoryListPage")
);
import { MasterHeader } from "../components/MasterHeader";
import { endPoint, envUrl } from "../utils/factory";
import { Layout } from "../components/Layout/Layout";
import { Empty } from "antd";
import ProductSkeleton from "../components/Product/ProductSkeleton";

function Home({ pageData }) {
  const router = useRouter();
  const urlPath = router.query.index;
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> pageData in [index]", pageData);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>2222 useRouter = ", router);
  return (
    <>
      <Layout
        CategoryData={pageData.data.category}
        assemblySolutionsList={pageData.data.assemblySolutionsList}
      >
        {pageData &&
          pageData.data &&
          pageData.data.catalogueDataBySlug &&
          pageData.data.catalogueDataBySlug.length > 0 && (
            <div>
              <iframe
                src={
                  process.env.BRAND_CDN_URL +
                  pageData.data.catalogueDataBySlug[0].file_url
                }
                height={1500}
                width={1500}
                // style={{
                //   position: "absolute",
                //   top: "0",
                //   left: "0",
                //   height: "100%",
                //   width: "100%",
                // }}
                frameBorder="0"
                allowFullScreen
                scrolling="no"
              ></iframe>
            </div>
          )}
        {pageData &&
          pageData.data &&
          pageData.data.catalogueDataBySlug &&
          pageData.data.catalogueDataBySlug.length == 0 && (
            <>
              {urlPath == "customized-product" && (
                <div>
                  <MasterHeader
                    title={
                      (pageData.data.productBySlug &&
                        pageData.data.productBySlug[0].name) ||
                      "Tricab"
                    }
                    isProductPage={true}
                    metaDescription={
                      pageData.data.productBySlug &&
                      pageData.data.productBySlug[0].meta_description
                    }
                    metaKeyword={
                      pageData.data.productBySlug &&
                      pageData.data.productBySlug[0].meta_keyword
                    }
                  />
                  <ProductPage
                    CategoryData={pageData.data.category}
                    // product={eval(pageData.data.productBySlug[0])}
                  />
                </div>
              )}
              {pageData && pageData.data && pageData.data.productBySlug && (
                <div>
                  {console.log("conditionnnnnnnnnnn111")}
                  <MasterHeader
                    title={
                      (pageData.data.productBySlug &&
                        pageData.data.productBySlug[0].name) ||
                      "Tricab"
                    }
                    isProductPage={true}
                    metaDescription={
                      pageData.data.productBySlug &&
                      pageData.data.productBySlug[0].meta_description
                    }
                    metaKeyword={
                      pageData.data.productBySlug &&
                      pageData.data.productBySlug[0].meta_keyword
                    }
                  />
                  <ProductPage
                    CategoryData={pageData.data.category}
                    product={eval(pageData.data.productBySlug[0])}
                    // urlPath={urlPath}
                  />
                </div>
              )}
              {pageData &&
                pageData.data &&
                pageData.data.content &&
                pageData.data.content.length > 0 && (
                  <div>
                    <MasterHeader
                      title={
                        (pageData.data.content &&
                          pageData.data.content[0].page_title) ||
                        "Tricab"
                      }
                      isProductPage={true}
                      metaDescription={
                        pageData.data.content &&
                        pageData.data.content[0].meta_description
                      }
                      metaKeyword={
                        pageData.data.content &&
                        pageData.data.content[0].meta_keyword
                      }
                    />
                    <ContentPage
                      CategoryData={pageData.data.category}
                      content={pageData.data.content[0]}
                    />
                  </div>
                )}
              {pageData &&
                pageData.data &&
                pageData.data.categorybyslug &&
                pageData.data.categorybyslug.length > 0 && (
                  <div>
                    {/* <MasterHeader
              title={
                (pageData.data.content &&
                  pageData.data.content[0].page_title) ||
                "Tricab"
              }
              isProductPage={true}
              metaDescription={
                pageData.data.content &&
                pageData.data.content[0].meta_description
              }
              metaKeyword={
                pageData.data.content && pageData.data.content[0].meta_keyword
              }
            /> */}
                    {/* {pageData.data.categorybyslug[0].length > 0 ? (
                    <CategoryListPage
                      CategoryDataBySlug={pageData.data.categorybyslug[0]}
                      CategoryData={pageData.data.category}
                    />
                  ) : (
                    <Empty />
                  )} */}
                    <CategoryListPage
                      CategoryDataBySlug={pageData.data.categorybyslug[0]}
                      CategoryData={pageData.data.category}
                    />
                  </div>
                )}
            </>
          )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log("((((((((((((((((( context =", context);
  let query = context.query;
  let pageData = null;

  console.log("######>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", query);

  var obj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: query.index,
      level: 1,
      page: query.page ? parseInt(query.page) : 1,
      pageSize: 6,
      order_by: query.orderBy ? query.orderBy : "Default",
      minimum_price: query.minPrice ? parseInt(query.minPrice) : 10,
      maximum_price: query.maxPrice ? parseInt(query.maxPrice) : 100000,
    }),
  };

  const response = await fetch(
    `${envUrl.baseUrl}${endPoint.webAttribute}`,
    obj
  );

  pageData = await response.json();
  console.log("pageData.data in [index]", pageData.data);
  // redirect invalid url to 404
  /*
  if (query.index !== "customized-product") {
    if (
      pageData &&
      pageData.data &&
      !pageData.data.products &&
      !pageData.data.productBySlug &&
      !pageData.data.content.length &&
      !pageData.data.categorybyslug.length &&
      !pageData.data.catalogueDataBySlug.length
    ) {
      context.res.writeHead(307, { Location: `/404` });
      context.res.end();
    }
  }
*/
  return {
    props: { pageData },
  };
}

export default Home;
